import { FC, ReactNode, forwardRef, ForwardedRef, useEffect } from 'react';
import '~/styles/animation/modal.css';

interface AnimatedModalProps {
  children: ReactNode;
  containerClass?: string;
}

const AnimatedModal = forwardRef(
  ({ children, containerClass }: AnimatedModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
      <dialog
        ref={ref}
        className={`w-[531px] min-h-[500px] rounded-[48px] bg-white modal-enter ${containerClass}`}
      >
        {children}
      </dialog>
    );
  }
);

export default AnimatedModal;
