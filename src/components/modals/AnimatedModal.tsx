import { FC, ReactNode, useEffect, useRef } from "react"
import "~/styles/animation.css"

interface AnimatedModalProps {
  children: ReactNode
}

export const AnimatedModal:FC<AnimatedModalProps> = ({children}) => {
  let mainContainer = useRef<HTMLDivElement | null>(null);

  // useEffect(()=> {
  //   if(mainContainer.current){
  //     mainContainer.current.
  //   }
  // }, [])

  return (
  <div
    ref={mainContainer}
    className="absolute left-0 top-0 flex items-center justify-center h-screen w-screen bg-black/30"
    style={{boxShadow: "0px 4px 32px 0px rgba(29, 29, 31, 0.12)"}}
  >
    <div
      className="w-[531px] min-h-[500px] rounded-[48px] flex flex-col items-center bg-white relative"
    >
      {children}
    </div>
  </div>
)}