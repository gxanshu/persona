import { FC, ReactNode } from "react"
import "~/styles/fadein-animation.css"

interface CardContainerProps {
	children: ReactNode;
	className?: string;
	delay: number
}

export const ProfileCard:FC<CardContainerProps> = ({children, delay, className}) => {
	return (
		<div className={`inline-flex p-[24px] items-center gap-[12px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-sm ${className} min-w-[184px] min-h-[184px]`}
			style={{animationName: "fadeIn"}}
		>
			{children}
		</div>
	)
}