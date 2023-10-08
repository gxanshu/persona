import { FC, ReactNode } from 'react'
import '~/styles/animation/modal.css'
import Animate from '../Animate'

interface AnimatedModalProps {
  children: ReactNode
  containerClass?: string
  show: boolean
}

export const AnimatedModal: FC<AnimatedModalProps> = ({ children, containerClass, show }) => {
  return (
    <Animate
      className="absolute left-0 top-0 flex items-center justify-center h-screen w-screen bg-black/30"
      enter='backdrop-enter'
      exit='backdrop-exit'
      show={show}
      style={{ boxShadow: '0px 4px 32px 0px rgba(29, 29, 31, 0.12)' }}
    >
      <Animate
        className={`w-[531px] min-h-[500px] rounded-[48px] flex flex-col items-center bg-white relative ${containerClass}`}
        enter='scale-enter'
        exit='scale-exit'
        show={show}
      >
        {children}
      </Animate>
    </Animate>
  )
}
