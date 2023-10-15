'use client'

import { useEffect, useRef, useState } from 'react'
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
import { CircularProgress } from '~/components/CircularProgress'

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
  const [time, setTime] = useState(60)
  const [step, setStep] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [audioState, setAudioState] = useState<AudioState>('play')
  const [recordingState, setRecordingState] = useState<RecordingState>('start')
  const [audioChunks, setAudioChunks] = useState<Blob[][]>([[], [], [], [], [], []])
  const mediaRecorder = useRef<MediaRecorder | undefined>()
  const audioFile = useRef<HTMLAudioElement | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const [upload, setUpload] = useState<number[]>([0, 0, 0, 0, 0, 0])

  useEffect(() => {
    if (audioChunks[step].length) {
      setRecordingState('stop')
      setIsRecording(false)
    }
  }, [step]) // will update on every step change

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        const localAudioChunks: Blob[] = [...audioChunks[step]]

        mediaRecorder.current.addEventListener('dataavailable', event => {
          if (event.data && event.data.size > 0) {
            localAudioChunks.push(event.data)
            setAudioChunks(prevChunks => {
              const newChunks = [...prevChunks]
              // updating current step chunks to newChunks
              newChunks[step] = localAudioChunks
              return newChunks
            })
          }
        })

        setIsRecording(true)
        mediaRecorder.current.start(100)
        console.log('Recording started! Speak now.')
      })
      .catch(err => {
        console.log('Error: ' + err)
      })
  }

  const stopRecording = () => {
    setRecordingState('stop')
    setIsRecording(false)
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      // removing previous mediaRecorder service from RAM
      // so this can recreate again (helps audio visuliser)
      mediaRecorder.current = undefined
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
      })
    }

    const blobObj = new Blob(audioChunks[step], { type: 'audio/mp3' })
    const audioContext = new AudioContext()
    const audioReader = new FileReader()

    audioReader.onload = function() {
      audioContext.decodeAudioData(audioReader.result as ArrayBuffer, function(audioBuffer) {
        const durationInSeconds = Math.round(audioBuffer.duration)
        console.log('Audio duration: ' + durationInSeconds + ' seconds')
        setTime(prevTime => prevTime - durationInSeconds)
      })
    }

    audioReader.readAsArrayBuffer(blobObj)
    console.log('Recorded')
  }

  const playAudio = () => {
    setAudioState('pause')
    const blobObj = new Blob(audioChunks[step], { type: 'audio/mp3' })
    const audioUrl = URL.createObjectURL(blobObj)
    audioFile.current = new Audio(audioUrl)
    audioFile.current.load() // need tobe done to work on IOS
    audioFile.current.play()
    audioFile.current.addEventListener('ended', () => {
      setAudioState('play')
    })
  }

  const pauseAudio = () => {
    setAudioState('play')
    if (audioFile.current) {
      audioFile.current.pause()
    }
  }

  const deleteAudio = () => {
    setRecordingState('start')
    setUpload((prev)=> {
      let local = [...prev];
      local[step] = 0;
      return local;
    })
    setIsRecording(false)
    if (audioFile.current) {
      audioFile.current.pause()
    }
    audioFile.current = undefined
    mediaRecorder.current = undefined

    setAudioChunks(prevChunks => {
      const newChunks = [...prevChunks]
      newChunks[step] = []
      return newChunks
    })

    const blobObj = new Blob(audioChunks[step], { type: 'audio/mp3' })
    const audioContext = new AudioContext()
    const audioReader = new FileReader()

    audioReader.onload = function() {
      audioContext.decodeAudioData(audioReader.result as ArrayBuffer, function(audioBuffer) {
        const durationInSeconds = Math.round(audioBuffer.duration)
        console.log('Audio duration: ' + durationInSeconds + ' seconds')
        setTime(prevTime => prevTime + durationInSeconds)
      })
    }

    audioReader.readAsArrayBuffer(blobObj)
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
                        {mediaRecorder.current && (
                          <LiveAudioVisualizer mediaRecorder={mediaRecorder.current} width={98} height={20} />
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
              <div className='relative flex justify-center items-center'>
              <button
                onClick={() => {
                  if(upload[step] < 100){
                    const interval = setInterval(() => {
                    setUpload((prevProgress) => {
                    if (prevProgress[step] < 100) {
                      let local = [...prevProgress];
                      local[step] = local[step] + 1
                      return local;
                    }
                    clearInterval(interval);
                    return prevProgress;
                  });
                }, 10); // Adjust the interval to control the speed of progress

                setTimeout(() => {
                  clearInterval(interval)
                  if (!audioChunks[step + 1].length) setRecordingState('start')
                    setStep(p => {
                      if (p == 5) return 5
                      return p + 1
                    })
                  }, 1500); // Stop the progress after 3 seconds
                  } else {
                    if (!audioChunks[step + 1].length) setRecordingState('start')
                    setStep(p => {
                      if (p == 5) return 5
                      return p + 1
                    })
                  }
                }}
                className={`p-[16px] flex items-center rounded-[32px] bg-[#187EE7]`}
              >
                <BigForwardIcon height={24} width={24} className="text-white" />
              </button>
              <CircularProgress total={upload[step]}/>
              </div>
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
