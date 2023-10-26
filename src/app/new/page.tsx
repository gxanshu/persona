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
import "~/styles/dot-pulse.css"

let ws: WebSocket | undefined = undefined;
let audioBufferQueue: AudioBuffer[] = []
let isPlaying = false; // Add this variable to track if audio is currently playing
let webSocketCalled = false;
type CallingState = "disconnect" | "connecting" | "connected"

export default function AiVoiceRecorder() {
  const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const [callingState, setCallingState] = useState<CallingState>("disconnect")
  const [isWebsocketReady, setIsWebsocketReady] = useState<boolean>(false)
  const [time, setTime] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);;
  const ringAudio = useRef<HTMLAudioElement>()
  const endAudio = useRef<HTMLAudioElement>()

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(async(stream) => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        const localAudioChunks: Blob[] = []

        mediaRecorder.current.addEventListener('dataavailable', async event => {
          if (event.data && event.data.size > 0) {
            const chunk = event.data
            localAudioChunks.push(chunk)
            // setAudioChunks(localAudioChunks)
            if (ws?.readyState === WebSocket.OPEN) {
              // Convert the Blob to ArrayBuffer for sending over WebSocket
              // console.log("Convert the Blob to ArrayBuffer for sending over WebSocket")
              const arrayBuffer = await chunk.arrayBuffer()
              // sending those thunks to websocket
              ws.send(arrayBuffer)
            }
          }
        })

        connectWebSocket();
        setCallingState("connecting");
        if(ringAudio.current){
          ringAudio.current.currentTime = 0
          ringAudio.current.play()
        }
      })
      .catch(err => {
        alert("Microphone is not accessible.")
        console.log('Error: ' + err)
      })
  }

  const stopRecording = () => {
    endAudio.current?.play()
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      // removing previous mediaRecorder service from RAM
      // so this can recreate again (helps audio visuliser)
      mediaRecorder.current = undefined
      setCallingState("disconnect")
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
    }

    clearTimeout(timerRef.current!)
    timerRef.current = null
    ws?.close()
    if (audioContext?.state === 'running') {
    audioContext.suspend().then(() => {
      console.log('AudioContext suspended');
    });
  }
    setTime(0)
    console.log('Recorded')
  }

  const playAudio = () => {
  if (audioContext && !isPlaying && audioBufferQueue.length > 0) {
    const buffer = audioBufferQueue.shift(); // Remove and get the first chunk (dequeue)

    if (buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.onended = () => {
        isPlaying = false;
        playAudio(); // Play the next chunk if available
      };

      source.start();
      isPlaying = true;
    } else {
      // Handle the case when the buffer is null
      playAudio(); // Proceed to the next chunk
    }
  }
};


function blobToArrayBuffer(blob: Blob): Promise<string | ArrayBuffer| null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(blob);
  });
}


  const startWebSocket = async (spawnBackend: ApiAudioStreaming) => {
    if(webSocketCalled) return
    const id = uuidv4()
    console.log('startWebSocket function called', spawnBackend, 'and id is', id)
    const wsUrl = spawnBackend.url.replace(/^https:\/\//, '') // removing https

    const websocket = new WebSocket(`wss://${wsUrl}ws/${id}`)
    webSocketCalled = true

    websocket.onopen = () => {
      console.info(
        `[${`wss://${wsUrl}ws/${id}`}] opened ws connection @`,
        performance.now(),
      )

      setIsWebsocketReady(true)

      websocket.send("start");
      // if(interval) {
      //   clearInterval(interval);
      // }

      // setTimeout(() => {
      //   setTimeout(()=>{
      //     interval = setInterval(() => {
      //       console.info("sending event");
      //       websocket.send('');
      //     }, 5000);
      //   },1000)
      // }, 1000)
    }

    websocket.onmessage = async (event) => {
      console.log(audioBufferQueue)
    if (typeof event.data === 'string') {
      // This is a text message
      const textMessage = event.data;
      console.log(textMessage);
      // Process and handle the text message here
    } else {
      const blob = new Blob([event.data], { type: 'audio/mp3' });
      if (blob.size !== 0) {
        const arrayBuffer = await blobToArrayBuffer(blob) as ArrayBuffer;
        audioContext?.decodeAudioData(arrayBuffer, (buffer) => {
          audioBufferQueue.push(buffer)
          console.log("binnary msg and isPlaying", isPlaying)
          if (!isPlaying) {
            playAudio();
          }
        });
      }
    }
};


    websocket.onclose = event => {
      console.log('connection closed')
      stopRecording()
      setIsWebsocketReady(false)
    }

    websocket.onerror = error => {
      stopRecording()
      console.log('there is an error')
      setIsWebsocketReady(false)
    }

    ws = websocket;
  }

  const connectWebSocket = async () => {
    let backendStatusChecker: NodeJS.Timeout // Declare the interval ID variable

    const spawnBackend = await startAudioStreaming()
    console.log('spawnBackend', spawnBackend)

    backendStatusChecker = setInterval(async () => {
      const backendStatus = await (await fetch(spawnBackend.status_url)).json() as spawnedBackendStatus
      if (backendStatus.state == 'Ready') {
        console.log('backend is ready')
        clearTimeout(backendStatusChecker)
        await startWebSocket(spawnBackend)
      }
      console.log('backendStatus', backendStatus)
    }, 1000)
  }

  useEffect(() => {
    let audiocontenxt = new AudioContext()
    ringAudio.current = new Audio('/audio/ring.wav');
    endAudio.current = new Audio('/audio/end.wav');
    setAudioContext(audiocontenxt)
    console.log("audio contenxt", audioContext)
  }, [])

  useEffect(()=> {
    if(isWebsocketReady){
          console.log("isWebsocketReady", isWebsocketReady)
          setCallingState("connected")
          timerRef.current = window.setInterval(() => {
            setTime(prevTime => prevTime + 1)
          }, 1000)
          if(mediaRecorder.current){
            mediaRecorder.current.start(50)
          } else {
            console.log("mediaRecorder.current is undefined")
          }
          ringAudio.current?.pause()
          console.log('Recording started! Speak now.')
        } else {
          console.log("isWebsocketReady", isWebsocketReady)
    }
  }, [isWebsocketReady])

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
              (callingState == "connecting" || callingState == "connected") ? 'backdrop-animate-05' : 'reverse-backdrop-animate-05'
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
            {callingState == "connected" && (
              <p className="w-[236px] scale-in-05 text-white text-center text-[21px] font-[300] leading-[150%]">
                Go ahead, I’m listening.....
              </p>
            )}
          </div>

          <div className="absolute top-[16px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {(callingState == "disconnect" || callingState == "connected") && <div className="flex py-[4px] px-[8px] items-center rounded-[24px] bg-[#1D1D1F80] backdrop-blur-lg">
              <div className="flex items-center gap-[4px]">
                <Avatar />
                <p className="text-white text-[13px] font-medium leading-[20px]">The Weeknd</p>
              </div>
            </div>}
          </div>

          {callingState == "connecting" && <div className="absolute top-[80px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
              <div className='inline-flex items-center flex-col gap-[12px]'>
                <Avatar xl/>
                <div className='dot-pulse' />
              </div>
          </div>}

          <div className="absolute top-[64px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {callingState == "connected" && (
              <p className="text-white text-center text-[13px] font-medium leading-[150%]">
                {formatTime(time)}
              </p>
            )}
          </div>
          <div className="absolute bottom-[32px] left-[50%]" style={{ transform: 'translateX(-50%)' }}>
            {callingState == "disconnect"
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
                    disabled={!isWebsocketReady}
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
      </div>
    </div>
  )
}

interface AvatarProps {
  xl?: boolean
}

const Avatar = ({xl = false}: AvatarProps) => {
  return (
    <div className="relative">
      <Image
        src={aiavatar}
        height={xl ? 120 : 28}
        width={xl ? 120 : 28}
        className={xl ? "rounded-[24px] h-[96px] w-[96px]" : "rounded-full h-[28px] w-[28px]"}
        alt="user avatar"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
        width={xl ? 20 : 12}
        height={xl ? 20 : 12}
        // viewBox={xl ? "0 0 20 20" : "0 0 12 12"}
        fill="none"
      >
        <circle cx={xl ? 10: 6} cy={xl ? 10: 6} r={xl ? 9 : 5} fill="#4ACF49" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}