'use client'
import aiavatar from "~/assets/images/aiavatar.png"
import { Icon, MicIcon } from "~/assets/icons"
import { useRef, useState } from "react"
import Image from "next/image"
// @ts-ignore
import { LiveAudioVisualizer } from 'react-audio-visualize'

export default function AiVoiceRecorder() {
	const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        const localAudioChunks: Blob[] = []

        mediaRecorder.current.addEventListener('dataavailable', event => {
          if (event.data && event.data.size > 0) {
            localAudioChunks.push(event.data)
            setAudioChunks(localAudioChunks)
          }
        })

        // setIsRecording(true)
        mediaRecorder.current.start(100)
        console.log('Recording started! Speak now.')
      })
      .catch(err => {
        console.log('Error: ' + err)
      })
  }

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<div className="max-w-[342px] h-full p-[24px]">
			<div className="relative">
				<Image
					src={aiavatar}
					width={342}
					height={400}
					className="rounded-[24px]"
					alt=""
				/>
				<div className="bg-gradient-to-b from-[rgba(0,0,0,0.24)] to-[rgba(0,0,0,0.24)] bg-cover bg-no-repeat h-full w-full rounded-[24px] absolute inset-0"/>

				<div className="absolute bottom-[152px] left-[50%] h-[20px]" style={{transform: "translateX(-50%)"}}>
					{mediaRecorder.current && (
            <LiveAudioVisualizer mediaRecorder={mediaRecorder.current} width={260} height={20} />
          )}
				</div>

				<button onClick={startRecording} className="absolute bottom-[32px] left-[50%]" style={{transform: "translateX(-50%)"}}>
					<Icon frameClass="h-[24px] w-[24px] text-white" containerClass="flex items-center justify-center p-[16px] rounded-[32px] bg-[#E71818]">
						<MicIcon/>
					</Icon>
				</button>
			</div>
	    </div>
		</div>
	)
}