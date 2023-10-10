import { CSSProperties, FC, ForwardedRef, forwardRef, ReactNode, useEffect } from 'react'
import '~/styles/animation/modal.css'

interface AnimatedModalProps {
  children: ReactNode
  containerClass?: string
  style?: CSSProperties
}

const AnimatedModal = forwardRef(
  ({ children, containerClass, style }: AnimatedModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
      <dialog
        ref={ref}
        className={`w-[531px] min-h-[500px] rounded-[48px] bg-white modal-enter ${containerClass}`}
        style={style}
      >
        {children}
      </dialog>
    )
  },
)

export default AnimatedModal
