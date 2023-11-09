import { MessageSend } from "~/components/chatpanel/MessageSend"
//@ts-ignore
import { AudioVisualizer } from 'react-audio-visualize';
import { useEffect, useRef, useState } from "react";
import { Icon, PlayIcon, StopIcon } from "~/assets/icons";

interface AudioTestingProps {
	voiceId: string;
}

let blobUrl: string | null = null;

export const AudioTesting = (props: AudioTestingProps) => {
	const [blob, setBlob] = useState<Blob>();
	const [loading, setLoading] = useState(false);
	const [audioPlaying, setAudioPlaying] = useState(false);
	const visualizerRef = useRef<HTMLCanvasElement>(null)
	const audioPlayer = useRef<HTMLAudioElement>()

	const handleSubmit = async (value: string) => {
		try {
			setLoading(true);
			setBlob(undefined);
			const responce = await fetch(`https://voicleclone-worker.safeapp.workers.dev/generate_tts?voice_id=${props.voiceId}`, {
				method: "POST",
				body: value
			})

			const blobData = await responce.blob();
			setBlob(blobData);
			setLoading(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
		}
	}

	useEffect(()=> {
		if(blobUrl){
			URL.revokeObjectURL(blobUrl)
		}
		if(blob && audioPlayer.current){
			blobUrl = URL.createObjectURL(blob);
			audioPlayer.current.src = blobUrl;
			audioPlayer.current.load();
		}
	}, [blob])

	useEffect(()=> {
		audioPlayer.current = new Audio();
	}, [])

	const playAudio = () => {
		setAudioPlaying(true);
		if(audioPlayer.current){
			audioPlayer.current.play()
	    audioPlayer.current.addEventListener('ended', () => {
	      setAudioPlaying(false);
	    })
		}
	}

	const pauseAudio = () => {
		if (audioPlayer.current) {
      audioPlayer.current.pause()
    }
	}

	return (
		<div className="flex flex-col items-center justify-between sm:p-[64px] p-[48px] h-full gap-[48px]">
			<div className="flex flex-col gap-[24px] items-center">
				<div className="w-full flex flex-col items-center gap-[8px]">
					<h2 className="break-words text-center text-[33px] leading-[40px] font-[700]">
						Test your clone
					</h2>
					<p className="text-[#494949] text-[15px] leading-[150%]">
						Enter any text and your clone can speak it
					</p>
				</div>
			</div>
			{blob && (
				<>
					<AudioVisualizer
						ref={visualizerRef}
						blob={blob}
						width={500}
						height={75}
						barWidth={1}
						gap={0}
						barColor={'#f76565'}
					/>
					<button
						onClick={audioPlaying ? pauseAudio : playAudio}
						className="flex py-[4px] px-[8px] justify-center rounded-[16px] border border-[#187EE7] bg-white"
					>
						<div className="flex items-center gap-[4px]">
							<Icon frameClass="h-[20px] w-[20px] text-[#187EE7]">
								{audioPlaying ? <StopIcon /> : <PlayIcon />}
							</Icon>
							<p className="w-[32px] text-[#187EE7] text-[13px] font-[500] leading-[20px]">
								{audioPlaying ? ('Stop') : ('Play')}
							</p>
						</div>
					</button>
				</>
			)}
			<MessageSend handleSubmit={handleSubmit} loading={loading} hideMic />
		</div>
	)
}