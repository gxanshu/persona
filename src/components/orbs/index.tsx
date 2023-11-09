const siri_orb = '/shaders/siri-orb.frag';
const color_wave = '/shaders/color-wave.frag';
const blue_wave = '/shaders/blue-wave.frag';
const black_wave = '/shaders/black-wave.frag';
import { OrbCanvas } from "./OrbCanvas"

interface OrbProps {
	className?: string;
	stream?: MediaStream;
}

export function SiriOrb({ stream, className }: OrbProps) {
	return (
		<OrbCanvas orb={siri_orb} stream={stream} className={className} />
	)
}

export function ColorWaveOrb({ stream, className }: OrbProps) {
	return (
		<OrbCanvas orb={color_wave} stream={stream} className={className} />
	)
}

export function BlueWaveOrb({ stream, className }: OrbProps) {
	return (
		<OrbCanvas orb={blue_wave} stream={stream} className={className} />
	)
}

export function BlackWaveOrb({ stream, className }: OrbProps) {
	return (
		<OrbCanvas orb={black_wave} stream={stream} className={className} />
	)
}