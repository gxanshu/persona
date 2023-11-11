'use client'
import {useEffect, useRef} from "react";

export default function HttpStreaming() {
	const audioPlayer = useRef<HTMLAudioElement>();

	let audioUrl = "https://fetch-stream-audio.anthum.com/5mbps/house-41000hz-trim.wav"
	let audioUrl2 = "https://samplelib.com/lib/preview/mp3/sample-15s.mp3"

	const playAudio = () => {
		if(audioPlayer.current){
			if(audioPlayer.current.paused){
				audioPlayer.current.src = audioUrl;
				audioPlayer.current?.play();
			} else {
				audioPlayer.current.pause();
				audioPlayer.current.currentTime = 0;
				audioPlayer.current.src = audioUrl2;
				audioPlayer.current?.play();
			}
		}
	}

	useEffect(()=> {
		audioPlayer.current = new Audio();
		audioPlayer.current.preload = "auto";
		// audioPlayer.current.oncanplay = () => {
		// 	audioPlayer.current?.play();
		// }
		audioPlayer.current.onended = () => {
			console.log("audio playing finish")
		}
		audioPlayer.current.onerror = () => {
			console.log("error while playing audio")
		}
	}, [])

	return (
		<main className="p-[72px]">
			<button className="border p-2 rounded" onClick={playAudio}>play audio</button>
		</main>
	)
}