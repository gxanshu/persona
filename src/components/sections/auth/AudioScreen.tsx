'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, MicIcon, PauseIcon, StopIcon } from '~/assets/icons'

export const AudioScreen: React.FC<{ text: string; subText: string }> = ({ text, subText }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [isPause, setIsPause] = useState<boolean>(false)
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const timeRef = useRef<HTMLParagraphElement>(null)
  const audioRecorder = useRef<MediaRecorder | null>(null)
  let intervalId: NodeJS.Timeout | null = null

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      audioRecorder.current = new MediaRecorder(stream)

      audioRecorder.current.addEventListener('dataavailable', e => {
        setAudioChunks(chunks => [...chunks, e.data])
      })

      audioRecorder.current.onstart = () => {
        let time = 0
        intervalId = setInterval(() => {
          if (!isPause) {
            time++
            if (timeRef.current) {
              timeRef.current.innerText = `${time}:00`
            }
          }
        }, 1000)
      }

      setIsRecording(true)
      setIsFinish(false)
      setAudioChunks([])
      audioRecorder.current.start()
      console.log('Recording started! Speak now.')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsFinish(true)
    if (audioRecorder.current) {
      audioRecorder.current.stop()
    }
    console.log('Recorded')
  }

  const playRecording = () => {
    const blobObj = new Blob(audioChunks, { type: 'audio/webm' })
    const audioUrl = URL.createObjectURL(blobObj)
    const audio = new Audio(audioUrl)
    audio.play()
  }

  const pauseRecording = () => {
    if (audioRecorder.current) {
      if (isPause) {
        audioRecorder.current.resume()
        setIsPause(false)
        console.log('Recording resuming')
        // Clear the interval when resuming
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      } else {
        audioRecorder.current.pause()
        setIsPause(true)
        console.log('Recording paused')
        // Clear the interval when pausing
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      }
    }
  }

  return (
    <div className="inline-flex flex-col items-center gap-[48px]">
      <div className="flex flex-col gap-[16px]">
        <h3 className="text-[#1D1D1F] text-center text-[48px] font-[600] leading-[110%] tracking-[-0.96px]">
          {text}
        </h3>
        <p className="text-[#494949] text-center text-[15px] leading-[150%]">{subText}</p>
      </div>
      <div className="flex flex-col items-center gap-[24px]">
        <div className="w-[400px] h-[110px] rounded-[24px] bg-[#F5F5F5] flex items-center justify-center">
          <p className="text-[#494949] text-[15px] leading-[20px]">Click the button to start recording</p>
        </div>
        {isFinish
          ? (
            <div className="flex items-center gap-[10px]">
              <button className="p-[12px] bg-gray-50 rounded-full" onClick={playRecording}>play</button>
              <button className="p-[12px] bg-gray-50 rounded-full" onClick={() => setIsFinish(false)}>
                delete
              </button>
              <button className="p-[12px] bg-gray-50 rounded-full" onClick={() => setIsFinish(false)}>
                save
              </button>
            </div>
          )
          : (isRecording
            ? (
              <div className="flex gap-[4px]">
                <div className="p-[8px] pr-[12px] bg-[#00000075] flex items-center rounded-full gap-[10px]">
                  <button onClick={stopRecording}>
                    <Icon frameClass={`h-[32px] w-[32px] ${isPause ? 'text-white' : 'text-red-400'}`}>
                      <StopIcon />
                    </Icon>
                  </button>
                  <p className="text-white" ref={timeRef}>0.00</p>
                </div>
                <button className="p-[12px] bg-[#E71818] rounded-full" onClick={pauseRecording}>
                  <Icon
                    frameClass="h-[32px] w-[32px] text-white"
                    containerClass={`${isPause ? 'animate-pulse' : ''}`}
                  >
                    <PauseIcon />
                  </Icon>
                </button>
              </div>
            )
            : (
              <button className="p-[12px] bg-[#E71818] rounded-full max-w-max" onClick={startRecording}>
                <Icon frameClass="h-[20px] w-[20px] text-white">
                  <MicIcon />
                </Icon>
              </button>
            ))}
      </div>
    </div>
  )
}

export default AudioScreen
