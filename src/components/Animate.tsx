import React, { AnimationEventHandler, CSSProperties, ReactNode } from "react";
import { useUnmountAnimation } from "~/hooks";

interface AnimateProps {
  show: boolean;
  enter: string;
  exit: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties
}

const Animate = ({ show, enter, exit, children, className, style }:AnimateProps) => {
  const [shouldRender, onAnimationEnd] = useUnmountAnimation(show);

  return (
    shouldRender && (
      <div
        className={`${className} ${show ? enter : exit}`}
        onAnimationEnd={onAnimationEnd as AnimationEventHandler<HTMLDivElement>}
      >
        {children}
      </div>
    )
  );
};

export default Animate;
