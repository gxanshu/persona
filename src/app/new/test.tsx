'use client'

import { useRef, useState } from 'react'
import {
  BackwardIcon,
  BigBackwordIcon,
  BigForwardIcon,
  DeleteIcon,
  FordwardIcon,
  Icon,
  MicIcon,
  PlayIcon,
  StopIcon,
} from '~/assets/icons'
// @ts-ignore
import { LiveAudioVisualizer } from 'react-audio-visualize'

type RecordingState = 'start' | 'stop'
type AudioState = 'play' | 'pause'

const text = [
  'The clay felt smooth in her hand. She mixed, remixed and brought to life an entire world of soft people.',
  'This is the second line. Its wrttien by some amazing guy from the past, it help our AI to clone you.',
  'Third line is really cool. because its third line, btw not a so much funny joke but you can lough.',
  'Fourth line here. on this duty to get users best experience possible with our frontend JavaScript code.',
  'Fifth line just some lorem ipsums Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
  'Sixth line copy of lorem ipsums Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.',
]

export default function AudioCloning() {
  const [recordingState, setRecordingState] = useState<RecordingState>('start')
  const [audioState, setAudioState] = useState<AudioState>('play')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const mediaRecoder = useRef<MediaRecorder>()
  const audioFile = useRef<HTMLAudioElement>()
  const streamRef = useRef<MediaStream>()
  // array of array of chunks
  const [audioChunks, setAudioChunks] = useState<Blob[][]>([[], [], [], [], [], []])
  const [time, setTime] = useState<number>(60)
  const [step, setStep] = useState<number>(0)

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        if(!streamRef.current){
          streamRef.current = stream
        }
        // Initialize the media recorder object
        if(!mediaRecoder.current){
          mediaRecoder.current = new MediaRecorder(stream)
        }

        let localAudioChunks: Blob[] = []; // Copy the existing audioChunks

      // dataavailable event is fired when the recording is stopped
      mediaRecoder.current.addEventListener('dataavailable', event => {
        if (typeof event.data === 'undefined') return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data); // Append new audio data to the array

        // Update the state with the updated audioChunks
        setAudioChunks((p)=> {
          let local = p; // coping last state
          local[step] = localAudioChunks; // replacing current step value's container to recorded value
          return local; // this is array of array of chunks with new data in it
        });
      });

      console.log(localAudioChunks)

        setIsRecording(true)
        if(step == 0) mediaRecoder.current.start(100)
        // if (step > 0 && step <= text.length) mediaRecoder.current.resume()
        console.log('Recording started! Speak now.')
      }).catch(err => {
        // If the user denies permission to record audio, then handle UI here.
        console.log('Error: ' + err)
      })
  }

  const stopRecording = () => {
    setRecordingState('stop')
    setIsRecording(false)
    if(step < text.length){
      mediaRecoder.current?.pause()
      console.log("pausing the recording")
    } else {
      mediaRecoder.current?.stop()
      console.log("stopping the recording")
      if (streamRef.current) {
      streamRef.current.getTracks().forEach(function(track) {
        track.stop()
      })
    }
    }
    const blobObj = new Blob(audioChunks, { type: 'audio/mp3' })
    const audioUrl = URL.createObjectURL(blobObj)
    audioFile.current = new Audio()
    audioFile.current.src = audioUrl
    audioFile.current.load()
    // finding audio timing
    const audioContext = new AudioContext()
    const audioReader = new FileReader()
    audioReader.onload = function() {
      audioContext.decodeAudioData(audioReader.result as ArrayBuffer, function(audioBuffer) {
        const durationInSeconds = audioBuffer.duration
        console.log('Audio duration: ' + durationInSeconds + ' seconds')
        setTime(60 - Math.round(durationInSeconds))
      })
    }

    audioReader.readAsArrayBuffer(blobObj)
    console.log('Recorded')
  }

  const playAudio = () => {
    setAudioState('pause')
    // alert(audioFile.current)
    if (audioFile.current) {
      let duration = audioFile.current.duration
      console.log(duration)
      audioFile.current.play()
      audioFile.current.addEventListener('ended', () => {
        setAudioState('play')
      })
    }
  }

  const pauseAudio = () => {
    setAudioState('play')
    if (audioFile.current) {
      audioFile.current.pause()
    }
  }

  const deleteAudio = () => {
    setAudioState('play')
    setRecordingState('start')
    setIsRecording(false)
    if (audioFile.current) {
      audioFile.current.pause()
    }
    audioFile.current = undefined
    mediaRecoder.current = undefined
    setStep(0)
    setTime(60)
  }

  return (
    <div className="w-screen flex items-center justify-center">
      <div className="max-w-[390px] h-[744px] px-[24px] py-[78px]">
        <div className="flex flex-col items-center h-full justify-between">
          {/*header section*/}
          <div className="inline-flex flex-col items-center gap-[16px]">
            <h2 className="text-[#1D1D1F] text-[33px] leading-[40px] text-center font-semibold tracking-[-0.66px]">
              Read the words
            </h2>
            <div className="flex items-center gap-[8px]">
              <div className="flex py-[4px] px-[12px] items-center bg-[#EBEBEB] rounded-[32px]">
                <BackwardIcon height={12} width={12} />
              </div>
              <p className="text-[#1D1D1F] text-center text-[13px]">{time} seconds left</p>
              <div className="flex py-[4px] px-[12px] items-center bg-[#EBEBEB] rounded-[32px]">
                <FordwardIcon height={12} width={12} />
              </div>
            </div>
          </div>
          {/*text section*/}
          <div className="inline-flex flex-col gap-[12px]">
            <p className="text-[#1D1D1F] text-[19px] font-semibold leading-[150%] max-w-[342px]">
              {text[step]}
            </p>
            {/*action button area*/}
            <div className="flex gap-[8px]">
              {recordingState == 'start'
                ? (
                  <div className="inline-flex py-[4px] px-[8px] justify-center gap-[10px] rounded-[16px] border border-[#1D1D1F1F] shadow-sm">
                    <div className="flex items-center gap-[4px]">
                      <div className={`w-[98px] h-[20px] rounded-[24px]`}>
                        {mediaRecoder.current && (
                          <LiveAudioVisualizer mediaRecorder={mediaRecoder.current} width={98} height={20} />
                        )}
                      </div>
                      {isRecording && (
                        <p className="text-[#1D1D1F] text-[13px] leading-[20px] ">Recording...</p>
                      )}
                    </div>
                  </div>
                )
                : (
                  <div className="flex gap-[8px]">
                    <button
                      onClick={audioState == 'play' ? playAudio : pauseAudio}
                      className="flex py-[4px] px-[8px] justify-center rounded-[16px] border border-[#187EE7] bg-white"
                      disabled={recordingState != 'stop'}
                    >
                      <div className="flex items-center gap-[4px]">
                        <Icon frameClass="h-[20px] w-[20px] text-[#187EE7]">
                          {audioState == 'play' ? <PlayIcon /> : <StopIcon />}
                        </Icon>
                        <p className="w-[32px] text-[#187EE7] text-[13px] font-[500] leading-[20px]">
                          {audioState == 'play' ? ('Play') : ('Stop')}
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={deleteAudio}
                      disabled={recordingState != 'stop'}
                      className="flex py-[4px] px-[8px] justify-center rounded-[16px] bg-white"
                    >
                      <Icon frameClass="h-[20px] w-[20px]">
                        <DeleteIcon />
                      </Icon>
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/*buttons area*/}
          <div className="inline-flex items-center gap-[16px]">
            <button
              onClick={() => {
                setStep(p => {
                  if (p == 0) return 0
                  return p - 1
                })
              }}
              className="flex p-[12px] items-center rounded-[32px] bg-white"
            >
              <BigBackwordIcon height={24} width={24} />
            </button>
            {recordingState == 'start' && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-[16px] flex items-center rounded-[32px] bg-[#E71818]`}
              >
                <Icon frameClass="h-[24px] w-[24px] text-white">
                  {isRecording ? <StopIcon /> : <MicIcon />}
                </Icon>
              </button>
            )}
            {recordingState == 'stop' && (
              <button
                onClick={() => {
                  setRecordingState('start')
                  setStep(p => {
                    if (p == 5) return 5
                    return p + 1
                  })
                }}
                className={`p-[16px] flex items-center rounded-[32px] bg-[#187EE7]`}
              >
                <BigForwardIcon height={24} width={24} className="text-white" />
              </button>
            )}
            {recordingState == 'start'
              ? (
                <button
                  onClick={() => {
                    setStep(p => {
                      if (p == 5) return 5
                      return p + 1
                    })
                  }}
                  className="flex p-[12px] items-center rounded-[32px] bg-white"
                >
                  <BigForwardIcon height={24} width={24} />
                </button>
              )
              : <div className="h-[48px] w-[48px]" />}
          </div>
        </div>
      </div>
    </div>
  )
}
