const audio = new Audio('/audio/ring.wav');

export function playRing() {
  audio.play();
}

export function stopRing(){
	audio.pause()
}

export default audio;