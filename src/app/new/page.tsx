'use client'
import aiavatar from '~/assets/images/aiavatar.png'
import { CallEndIcon, CallIcon, Icon, MuteCallIcon, VideoCallIcon } from '~/assets/icons'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
// @ts-ignore
import { LiveAudioVisualizer } from 'react-audio-visualize'
import '~/styles/animation.css'
import { v4 as uuidv4 } from 'uuid'
import { ApiAudioStreaming, spawnedBackendStatus, startAudioStreaming } from '~/api/audioStreaming'

let interval: NodeJS.Timeout | undefined = undefined;

export default function AiVoiceRecorder() {
  const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const [recording, setRecording] = useState(false)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false)
  const [time, setTime] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [audioBlobs, setAudioBlobs] = useState<Blob[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const [readyToPlay, setReadyToPlay] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  const startRecording = () => {
    ws?.send("start");
    if(interval) {
      clearInterval(interval);
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        const localAudioChunks: Blob[] = []

        mediaRecorder.current.addEventListener('dataavailable', async event => {
          if (event.data && event.data.size > 0) {
            const chunk = event.data
            localAudioChunks.push(chunk)
            // setAudioChunks(localAudioChunks)
            console.log(ws)
            if (ws?.readyState === WebSocket.OPEN) {
              // Convert the Blob to ArrayBuffer for sending over WebSocket
              console.log("Convert the Blob to ArrayBuffer for sending over WebSocket")
              const arrayBuffer = await chunk.arrayBuffer()
              // sending those thunks to websocket
              ws.send(arrayBuffer)
            }
          }
        })

        setRecording(true)
        timerRef.current = window.setInterval(() => {
          setTime(prevTime => prevTime + 1)
        }, 1000)
        mediaRecorder.current.start(500)
        console.log('Recording started! Speak now.')
      })
      .catch(err => {
        console.log('Error: ' + err)
      })
  }

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      // removing previous mediaRecorder service from RAM
      // so this can recreate again (helps audio visuliser)
      mediaRecorder.current = undefined
      setRecording(false)
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
    }

    clearTimeout(timerRef.current!)
    timerRef.current = null
    setTime(0)
    console.log('Recorded')
  }

  const startWebSocket = async (spawnBackend: ApiAudioStreaming) => {
    const id = uuidv4()
    console.log('startWebSocket function called', spawnBackend, 'and id is', id)
    const wsUrl = spawnBackend.url.replace(/^https:\/\//, '') // removing https

    const websocket = new WebSocket(`wss://${wsUrl}ws/${id}`)

    websocket.onopen = () => {
      console.info(
        `[${`wss://${wsUrl}ws/${id}`}] opened ws connection @`,
        performance.now(),
      )

      setTimeout(() => {
        setTimeout(()=>{
          interval = setInterval(() => {
            console.info("sending event");
            websocket.send('');
          }, 5000);
        },1000)
      }, 1000)
    }

    websocket.onmessage = (event) => {
      const blob = new Blob([event.data], { type: 'audio/mp3' }); // Set the appropriate MIME type
      console.log("blob", blob)
      setAudioBlobs((prevBlobs) => [...prevBlobs, blob]);
      // Play the first audio blob if the player is not playin
    }

    websocket.onclose = event => {
      console.log('connection closed')
    }

    websocket.onerror = error => {
      console.log('there is an error')
    }

    setWs(websocket)
  }

  const connectWebSocket = async () => {
    let backendStatusChecker: NodeJS.Timeout // Declare the interval ID variable

    const spawnBackend = await startAudioStreaming()
    console.log('spawnBackend', spawnBackend)

    backendStatusChecker = setInterval(async () => {
      const backendStatus = await (await fetch(spawnBackend.status_url)).json() as spawnedBackendStatus
      if (backendStatus.state == 'Ready') {
        console.log('backend is ready')
        setIsBackendReady(true)
        clearTimeout(backendStatusChecker)
        await startWebSocket(spawnBackend)
      }
      console.log('backendStatus', backendStatus)
    }, 1000)
  }

  // // Function to play audio blobs
  // const playAudio = () => {
  // 	console.log("called play audio function", audioBlobs.length)
  //   if (audioBlobs.length > 0) {
  //     const blob = audioBlobs[0];
  //     const audioElement = audioElementRef.current;
  //     console.log("audioElement", audioElement)

  //     if (audioElement && audioElement.src === '') {
  //       audioElement.src = URL.createObjectURL(blob);
  //       audioElement.controls = true;
  //       audioElement.play();
  //     }
  //   }
  // };

  const playNextAudio = () => {
    if (audioBlobs.length > 0 && !readyToPlay) {
      setReadyToPlay(true); // Set a flag to prevent multiple calls
      const blob = audioBlobs[0];
      const audioElement = audioElementRef.current;

      if (audioElement) {
        audioElement.src = URL.createObjectURL(blob);
        audioElement.play();
        audioElement.onended = () => {
          setReadyToPlay(false); // Reset the flag
          setAudioBlobs((prevBlobs) => prevBlobs.slice(1));
        };
      }
    }
  };

  // Listen for the "ended" event to play the next audio blob
  // useEffect(() => {
  //   if (audioElementRef.current) {
  //     audioElementRef.current.addEventListener('ended', () => {
  //       setAudioBlobs((prevBlobs) => prevBlobs.slice(1));
  //       playAudio(); // Play the next audio blob
  //     });
  //   }
  // }, []);

  // Listen for the "ended" event to play the next audio chunk
  useEffect(() => {
    playNextAudio()
  }, [audioBlobs]);

  // useEffect(() => {
  //   // Play audio when the state has audio blobs
  //   if (audioBlobs.length > 0) {
  //     playAudio(audioBlobs[0]);
  //     setAudioBlobs((prevBlobs) => prevBlobs.slice(1));
  //   }
  // }, [audioBlobs]);

  useEffect(() => {
  	let audiocontenxt = new AudioContext()
  	setAudioContext(audiocontenxt)
  	console.log("audio contenxt", audioContext)
    connectWebSocket()
    setReadyToPlay(false); // Reset the flag when the component mounts

    // return () => {
    //   ws?.close()
    // }
  }, [])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-full p-[24px]">
        <div className="relative">
          <Image
            src={aiavatar}
            width={342}
            height={400}
            className="rounded-[24px] w-[342px] h-[400px]"
            alt=""
          />
          <div
            className={`h-full w-full rounded-[24px] ${
              recording ? 'backdrop-animate-05' : 'reverse-backdrop-animate-05'
            } absolute inset-0`}
            style={{
              background: `${
                mediaRecorder.current
                  ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.56) 0%, rgba(0, 0, 0, 0.56) 100%)'
                  : 'linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%)'
              }`,
            }}
          />

          <div
            className="absolute bottom-[136px] left-[50%] h-[20px]"
            style={{ transform: 'translateX(-50%)' }}
          >
            {mediaRecorder.current && (
              <LiveAudioVisualizer mediaRecorder={mediaRecorder.current} width={310} height={16} />
            )}
          </div>

          <div className="absolute bottom-[200px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {recording && (
              <p className="w-[236px] scale-in-05 text-white text-center text-[21px] font-[300] leading-[150%]">
                Go ahead, I’m listening.....
              </p>
            )}
          </div>

          <div className="absolute top-[16px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            <div className="flex py-[4px] px-[8px] items-center rounded-[24px] bg-[#1D1D1F80] backdrop-blur-lg">
              <div className="flex items-center gap-[4px]">
                <Avatar />
                <p className="text-white text-[13px] font-medium leading-[20px]">The Weeknd</p>
              </div>
            </div>
          </div>

          <div className="absolute top-[64px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {recording && (
              <p className="text-white text-center text-[13px] font-medium leading-[150%]">
                {formatTime(time)}
              </p>
            )}
          </div>

          {
            /*<button
            disabled={!isBackendReady}
            onClick={recording ? stopRecording : startRecording}
            className="absolute bottom-[32px] left-[50%]"
            style={{ transform: 'translateX(-50%)' }}
          >
            <Icon
              frameClass="h-[24px] w-[24px] text-white"
              containerClass={`flex items-center justify-center p-[16px] rounded-[32px] ${
                recording ? 'bg-[#898A8A]' : 'bg-[#E71818]'
              } ${isBackendReady ? 'bg-[#898A8A]' : 'bg-[#E71818]'}`}
            >
              {recording ? <AudioCrossIcon /> : <MicIcon />}
            </Icon>
          </button>*/
          }
          <div className="absolute bottom-[32px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {!recording
              ? (
                <button
                  // disabled={!isBackendReady}
                  onClick={startRecording}
                >
                  <Icon
                    frameClass="h-[28px] w-[28px]"
                    containerClass="flex items-center justify-center p-[12px] rounded-[32px] bg-white"
                  >
                    <CallIcon />
                  </Icon>
                </button>
              )
              : (
                <div className="inline-flex gap-[24px]">
                  <button
                    // disabled={!isBackendReady}
                    // onClick={startRecording}
                  >
                    <Icon
                      frameClass="h-[28px] w-[28px] text-white"
                      containerClass="flex items-center justify-center p-[12px] rounded-[32px] border border-[#FFFFFF52] backdrop-blur-lg"
                    >
                      <MuteCallIcon />
                    </Icon>
                  </button>
                  <button
                    // disabled={!isBackendReady}
                    // onClick={startRecording}
                  >
                    <Icon
                      frameClass="h-[28px] w-[28px] text-white"
                      containerClass="flex items-center justify-center p-[12px] rounded-[32px] border border-[#FFFFFF52] backdrop-blur-lg"
                    >
                      <VideoCallIcon />
                    </Icon>
                  </button>
                  <button
                    // disabled={!isBackendReady}
                    onClick={stopRecording}
                  >
                    <Icon
                      frameClass="h-[28px] w-[28px] text-white"
                      containerClass="flex items-center justify-center p-[12px] rounded-[32px] bg-[#E71818]"
                    >
                      <CallEndIcon />
                    </Icon>
                  </button>
                </div>
              )}
          </div>
        </div>
        <audio ref={audioElementRef} controls></audio>
      </div>
    </div>
  )
}

const Avatar = () => {
  return (
    <div className="relative">
      <Image
        src={aiavatar}
        height={28}
        width={28}
        className="rounded-full h-[28px] w-[28px]"
        alt="user avatar"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <circle cx="6" cy="6" r="5" fill="#4ACF49" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}
