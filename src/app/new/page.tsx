'use client'
import aiavatar from "~/assets/images/aiavatar.png"
import { Icon, MicIcon } from "~/assets/icons"
import { useRef } from "react"

export default function AiVoiceRecorder() {
	const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        // streamRef.current = stream
        // mediaRecorder.current = new MediaRecorder(stream)
        // const localAudioChunks: Blob[] = [...audioChunks[step]]

        // mediaRecorder.current.addEventListener('dataavailable', event => {
        //   if (event.data && event.data.size > 0) {
        //     localAudioChunks.push(event.data)
        //     setAudioChunks(prevChunks => {
        //       const newChunks = [...prevChunks]
        //       // updating current step chunks to newChunks
        //       newChunks[step] = localAudioChunks
        //       return newChunks
        //     })
        //   }
        // })

        // setIsRecording(true)
        // mediaRecorder.current.start(100)
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
				<div className="w-[342px] h-[400px] bg-cover rounded-[24px]" style={{background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%), url(${aiavatar.src}), lightgray 50% / cover no-repeat`}}/>
				<button onClick={startRecording} className="absolute bottom-[32px] left-[140px]">
					<Icon frameClass="h-[24px] w-[24px] text-white" containerClass="flex items-center justify-center p-[16px] rounded-[32px] bg-[#E71818]">
						<MicIcon/>
					</Icon>
				</button>
			</div>
	    </div>
		</div>
	)
}