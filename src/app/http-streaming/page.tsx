'use client'
import { useEffect, useRef } from "react";

export default function HttpStreaming() {
	const audioPlayer = useRef<HTMLAudioElement>();

	let audioUrl = "https://fetch-stream-audio.anthum.com/5mbps/house-41000hz-trim.wav"
	let audioUrl2 = "https://samplelib.com/lib/preview/mp3/sample-15s.mp3"
	let audioUrl3 = "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_5MB_MP3.mp3"
	let audioUrl4 = 'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_1OMB_MP3.mp3'

	const playAudio = (url: string) => {
		if (audioPlayer.current) {
			audioPlayer.current.pause();
			audioPlayer.current.currentTime = 0;
			audioPlayer.current.src = url;
			audioPlayer.current?.play();
		}
	}

	useEffect(() => {
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
		<main className="p-[72px] flex gap-[16px]">
			<button className="border p-2 rounded" onClick={()=> playAudio(audioUrl)}>play audio (3.1mb)</button>
			<button className="border p-2 rounded" onClick={()=> playAudio(audioUrl2)}>play audio (900kb)</button>
			<button className="border p-2 rounded" onClick={()=> playAudio(audioUrl3)}>play audi0 (5mb)</button>
			<button className="border p-2 rounded" onClick={()=> playAudio(audioUrl4)}>play audio (10mb)</button>
		</main>
	)
}