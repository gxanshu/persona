import { useEffect, useRef } from 'react'

interface CircularProgressProps {
  total: number
}

export const CircularProgress = ({ total = 0 }: CircularProgressProps) => {
  const progressRef = useRef<SVGCircleElement | null>(null)

  useEffect(() => {
    if (progressRef.current) {
      let radius = progressRef.current.r.baseVal.value
      let circumference = radius * 2 * Math.PI
      progressRef.current.style.strokeDasharray = String(circumference)
      progressRef.current.style.strokeDashoffset = String(circumference - (total / 100) * circumference)
    }
  }, [total])

  return (
    <svg width={72} height={72} className="absolute z-[-1]">
      <circle
        r={33}
        cx={'35.5px'}
        cy={'35.5px'}
        className="fill-none stroke-[4px]"
        style={{ stroke: '#d9d9d9' }}
      />
      <circle
        ref={progressRef}
        r={33}
        cx={'35.5px'}
        cy={'35.5px'}
        className="fill-none stroke-[4px]"
        style={{ stroke: '#187EE7' }}
      />
    </svg>
  )
}
