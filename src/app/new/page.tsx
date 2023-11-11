'use client'
import aiavatar from '~/assets/images/aiavatar.png'
import { CallEndIcon, CallIcon, Icon, MuteCallIcon, VideoCallIcon } from '~/assets/icons'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
// @ts-ignore
import { LiveAudioVisualizer } from 'react-audio-visualize'
import '~/styles/animation.css'
import "~/styles/dot-pulse.css"
import Script from 'next/script'

let isPlaying = false;
type CallingState = "disconnect" | "connecting" | "connected"

export default function AiVoiceRecorder() {
  const [callingState, setCallingState] = useState<CallingState>("disconnect")
  const [time, setTime] = useState(0)
  const timerRef = useRef<number | null>(null)
  const ringAudio = useRef<HTMLAudioElement>()
  const endAudio = useRef<HTMLAudioElement>()
  const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const myvad = useRef();
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const audioCtx = useRef<AudioContext>();
  const audioSource = useRef<AudioBufferSourceNode>();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  const playAudio = (audio: Float32Array) => {
    if(isPlaying == false && audioCtx.current){
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/audio', true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function() {
        if (xhr.status === 200) {
          isPlaying = true;
          let audioData = new Uint8Array(xhr.response);
          audioCtx.current?.decodeAudioData(audioData.buffer, function(buffer) {
            if(audioSource.current && audioCtx.current){
              audioSource.current.buffer = buffer;
              audioSource.current.connect(audioCtx.current.destination);
              audioSource.current.onended = () => {
                isPlaying = false;
              }
              audioSource.current.start(0);
            }
          });
        }
      };

    xhr.send(audio);
    console.log(audio);
    }
  }

  const pauseAndCleanAudio = () => {
    if (audioSource.current) {
      audioSource.current.stop();
      isPlaying = false
      audioSource.current = undefined; // Set the AudioBufferSourceNode to null to clean the buffer
      audioSource.current = audioCtx.current?.createBufferSource()
    }
};

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: {
          channelCount: 1,
          echoCancellation: true,
          autoGainControl: true,
          noiseSuppression: true,
      } })
      .then(async(stream) => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        
        setCallingState("connecting");

        //@ts-ignore
        myvad.current = await vad.MicVAD.new({
          //@ts-ignore
          onSpeechEnd: (audio: Float32Array) => {
            playAudio(audio);
            console.log('end')
          },
          onSpeechStart: () => {
            if(isPlaying){
              pauseAndCleanAudio();
            }
            console.log('start');
          },
          stream: stream
        })

        //@ts-ignore
        myvad.current.start();

        mediaRecorder.current?.start(50)
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

    if(myvad.current){
      //@ts-ignore
        myvad.current.pause()
        delete myvad.current
    }

    setTime(0)
    pauseAndCleanAudio();
  }

  useEffect(() => {
    // window.playCacheChunks = () => audioPlayer.current?.play(); 
    ringAudio.current = new Audio('/audio/ring.wav');
    endAudio.current = new Audio('/audio/end.wav');
    //@ts-ignore
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    audioSource.current = audioCtx.current.createBufferSource();
    if(audioPlayer.current){
      audioPlayer.current.preload = "auto";
      audioPlayer.current.onended = () => {
        console.log("audio playing finish")
      }
      audioPlayer.current.onerror = () => {
        console.log("error while playing audio")
      }
    }
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
        <audio ref={audioPlayer} controls></audio>
      </div>
      <Script src="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.js" strategy='beforeInteractive' />
      <Script src="https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.7/dist/bundle.min.js" strategy='beforeInteractive' />
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