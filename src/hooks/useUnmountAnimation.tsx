'use client';
import { AnimationEventHandler, useEffect, useState } from "react";

export const useUnmountAnimation = (show: boolean) => {
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd: AnimationEventHandler<HTMLElement> = () => {
    if (!show) setRender(false);
  };

  return [shouldRender, onAnimationEnd];
};
