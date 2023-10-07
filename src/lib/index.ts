interface AnimationProps {
  name: string
  timing?: number
  delay?: number
  easing?: easing
  direction?: direction
  fillMode?: fillMode
}

type easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end'
type direction = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
type fillMode = 'none' | 'forwards' | 'backwards' | 'both'

export function animate({
  name,
  timing = 1,
  delay = 0,
  easing = 'ease',
  direction = 'normal',
  fillMode = 'forwards',
}: AnimationProps) {
  return {
    animationName: name,
    animationDuration: `${timing}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: easing,
    animationDirection: direction,
    transitionDuration: `${timing}s`,
    animationFillMode: fillMode,
  }
}
