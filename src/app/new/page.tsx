'use client'
import aiavatar from "~/assets/images/aiavatar.png"
import { AudioCrossIcon, Icon, MicIcon } from "~/assets/icons"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
// @ts-ignore
import { LiveAudioVisualizer } from 'react-audio-visualize'
import "~/styles/animation.css"
import { v4 as uuidv4 } from 'uuid';
import { ApiAudioStreaming, spawnedBackendStatus, startAudioStreaming } from "~/api/audioStreaming"
import { clearInterval } from "timers"

export default function AiVoiceRecorder() {
	const mediaRecorder = useRef<MediaRecorder | undefined>()
  const streamRef = useRef<MediaStream | undefined>()
  const [recording, setRecording] = useState(false)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [ws, setWs] = useState<WebSocket>()
  const [isBackendReady, setIsBackendReady] = useState<boolean>(false)

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        streamRef.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        const localAudioChunks: Blob[] = []

        mediaRecorder.current.addEventListener('dataavailable', async(event) => {
          if (event.data && event.data.size > 0) {
          	const chunk = event.data;
            localAudioChunks.push(chunk)
            // setAudioChunks(localAudioChunks)
	           if(ws){
	           	if (ws.readyState === WebSocket.OPEN) {
	            // Convert the Blob to ArrayBuffer for sending over WebSocket
	            const arrayBuffer = await chunk.arrayBuffer();
	            // sending those thunks to websocket
	            ws.send(arrayBuffer);
	          } else {
	          	console.log("no websocket in state");
	          }
           }
          }
        })

        setRecording(true)
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
    console.log('Recorded')
  }

  const startWebSocket = async(spawnBackend: ApiAudioStreaming) => {
  	const id = uuidv4();
  	console.log("startWebSocket function called", spawnBackend, "and id is", id)
  	const wsUrl = spawnBackend.url.replace(/^https:\/\//, ''); // removing https

  	const websocket = new WebSocket(`wss://${wsUrl}ws/${id}`);
  	setWs(websocket)

  	ws?.addEventListener("open", () => {
    console.info(
      `[${`wss://${wsUrl}ws/${id}`}] opened ws connection @`, performance.now());

    setTimeout(()=>{
    	ws?.send(JSON.stringify({
          "instance_id": "55d67b9c-5428-400f-8da2-204ab1a1ae5c",
          "group_id": "d7eac060-98dc-4e1a-8ea9-3f67bb31c7d4",
          "name": "Don bosco",
          "company_title": "CEO",
          "company": "Bhuman"
			}))
    },1000)

    ws?.addEventListener('close', (event) => {
    	console.log("connection closed")
    })

    ws?.addEventListener("error", (error)=> {
    	console.log("there is an error")
    })
  });
  }

  const connectWebSocket = async() => {
  	let backendStatusChecker: NodeJS.Timeout; // Declare the interval ID variable

  	const spawnBackend = await startAudioStreaming();
  	console.log("spawnBackend", spawnBackend)

  	backendStatusChecker = setInterval(async()=> {
  		const backendStatus = await (await fetch(spawnBackend.status_url)).json() as spawnedBackendStatus
  		if(backendStatus.state == "Ready"){
  			console.log('backend is ready')
  			setIsBackendReady(true)
  			clearTimeout(backendStatusChecker)
  			await startWebSocket(spawnBackend);
  		}
  		console.log("backendStatus", backendStatus)
  	}, 1000)
  }

  useEffect(()=> {
  	connectWebSocket();

  	return ()=> {
  		ws?.close()
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
				<div className={`h-full w-full rounded-[24px] ${recording ? "backdrop-animate-05": "reverse-backdrop-animate-05"} absolute inset-0`}
					style={{background: `${mediaRecorder.current ? "linear-gradient(180deg, rgba(255, 255, 255, 0.56) 0%, rgba(0, 0, 0, 0.56) 100%)": "linear-gradient(180deg, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.24) 100%)"}`}}
				/>

				<div className="absolute bottom-[136px] left-[50%] h-[20px]" style={{transform: "translateX(-50%)"}}>
					{mediaRecorder.current && (
            <LiveAudioVisualizer mediaRecorder={mediaRecorder.current} width={310} height={16} />
          )}
				</div>

				<div className="absolute bottom-[200px] left-[50%]" style={{transform: "translateX(-50%)"}}>
					{recording && (
						<p className="w-[236px] scale-in-05 text-white text-center text-[21px] font-[300] leading-[150%]">Go ahead, I’m listening.....</p>
					)}
				</div>

				<div className="absolute top-[16px] left-[50%]" style={{transform: "translateX(-50%)"}}>
					<div className="flex py-[4px] px-[8px] items-center rounded-[24px] bg-[#1D1D1F80] backdrop-blur-lg">
						<div className="flex items-center gap-[4px]">
							<Avatar/>
							<p className="text-white text-[13px] font-medium leading-[20px]">The Weeknd</p>
						</div>
					</div>
				</div>

				<button disabled={!isBackendReady} onClick={recording ? stopRecording : startRecording} className="absolute bottom-[32px] left-[50%]" style={{transform: "translateX(-50%)"}}>
					<Icon frameClass="h-[24px] w-[24px] text-white" containerClass={`flex items-center justify-center p-[16px] rounded-[32px] ${recording ? "bg-[#898A8A]": "bg-[#E71818]"} ${isBackendReady ? "bg-[#898A8A]": "bg-[#E71818]"}`}>
						{recording ? (<AudioCrossIcon/>): (<MicIcon/>)}
					</Icon>
				</button>
			</div>
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
			<svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 right-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
			  <circle cx="6" cy="6" r="5" fill="#4ACF49" stroke="white" strokeWidth="2"/>
			</svg>
		</div>
 )
}