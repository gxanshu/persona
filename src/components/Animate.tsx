import React, { AnimationEventHandler, CSSProperties, ReactNode, useEffect } from 'react'
import { useUnmountAnimation } from '~/hooks'

interface AnimateProps {
  show: boolean
  enter: string
  exit: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const Animate = ({ show, enter, exit, children, className, style }: AnimateProps) => {
  const [shouldRender, onAnimationEnd] = useUnmountAnimation(show)

  useEffect(()=> {
    if(shouldRender){
      let div = document.getElementById("main-area")
    if(div) div.style.overflow = "hidden"
    }
    return () => {
      let div = document.getElementById("main-area")
    if(div) div.style.overflow = "auto"
    }
  }, [shouldRender])

  return (
    shouldRender && (
      <div
        className={`${className} ${show ? enter : exit}`}
        onAnimationEnd={onAnimationEnd as AnimationEventHandler<HTMLDivElement>}
      >
        {children}
      </div>
    )
  )
}

export default Animate
