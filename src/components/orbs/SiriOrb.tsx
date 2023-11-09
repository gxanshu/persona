import { init } from "next/dist/compiled/webpack/webpack";
import { useEffect, useRef } from "react";
const siri_orb = "/shaders/siri-orb.frag";
const vert = "/shaders/shader.vert";
import Shader from "./shader";

interface SiriOrbProps {
	className?: string;
	stream?: MediaStream
}

let audioContext: AudioContext;
let analyser: AnalyserNode;
let audioData: Uint8Array;
let audioSample: number = 0;

function initAudio(stream: MediaStream) {
	audioContext = new AudioContext();
	analyser = audioContext.createAnalyser();
	analyser.fftSize = 64;
	audioData = new Uint8Array(analyser.frequencyBinCount);
	audioSample = 0;

	let source = audioContext.createMediaStreamSource(stream);
	source.connect(analyser);
	updateAudio();
}

function updateAudio() {
	analyser.getByteFrequencyData(audioData);
	audioSample = audioData[0] / 256;
	requestAnimationFrame(updateAudio);
	console.log("updateAudio")
}

export default async function SiriOrb({ className, stream }: SiriOrbProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const init = async() => {
		if(canvasRef.current){
					if (stream) {
				initAudio(stream);
			} else {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
					initAudio(stream);
				} catch (error) {
					console.error('Error accessing microphone:', error);
				}
			}
			let shader1 = new Shader(canvasRef.current, vert, siri_orb);
			function update() {
			    shader1.audio = audioSample;
			}
			setInterval(update, 1000 / 60);
		}
	}

	useEffect(()=> {
		init();
	}, [])

	return (
		<canvas className={`bg-black ${className}`} ref={canvasRef}></canvas>
	)
}