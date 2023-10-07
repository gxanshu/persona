'use client';
import { Icon, PanelSearch, MsgMicIcon, MsgSendIcon } from "~/assets/icons"
import { useState } from "react";

export const MessageSend = () => {
	const [input, setInput] = useState("")
	return (
		<div className="flex gap-[8px] items-center">
			<div className="inline-flex p-[12px] items-center rounded-[12px] bg-[#EBEBEB]">
			<div className="inline-flex gap-[8px]">
				<Icon frameClass="h-[13px] w-[13px] mt-[4px]" containerClass="h-[20px] w-[20px] inline-flex justify-center"> 
					<PanelSearch/>
				</Icon>
				<input placeholder="Message" type="text" value={input} onChange={(e)=> setInput(e.target.value)} className="placeholder:text-[#86868B] text-[15px] leading-[20px] border-none outline-none bg-[#EBEBEB] h-[24px] w-[431px]"/>
			</div>
		</div>
		<div className={`inline-flex items-center justify-center p-[12px] rounded-[32px] ${input != "" ? "bg-[#0095F6]": "bg-[#EBEBEB]"}`}>
			{input != "" ? <Icon frameClass="w-[24px] h-[24px]"><MsgSendIcon/></Icon> : <Icon frameClass="w-[24px] h-[24px]"><MsgMicIcon/></Icon>}
		</div>
		</div>
	)
}