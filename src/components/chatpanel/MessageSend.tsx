'use client'
import { useState } from 'react';
import { Icon, MsgMicIcon, MsgSendIcon, PanelSearch } from '~/assets/icons'
import { Loader } from '../Loader';

interface MessageSendProps {
  hideMic?: boolean
  handleSubmit: (text: string)=> void;
  loading?: boolean
}

export const MessageSend = (props: MessageSendProps) => {
    const [input, setInput] = useState('')
  return (
    <div className="flex gap-[8px] items-center w-full">
      <div className="inline-flex p-[12px] items-center grow rounded-[12px] bg-[#EBEBEB]">
        <div className="inline-flex gap-[8px] w-full">
          <Icon
            frameClass="h-[13px] w-[13px] mt-[4px]"
            containerClass="h-[20px] w-[20px] inline-flex justify-center"
          >
            <PanelSearch />
          </Icon>
          <input
            placeholder="Message"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="placeholder:text-[#86868B] text-[15px] leading-[20px] border-none outline-none bg-[#EBEBEB] h-[24px] w-full"
          />
        </div>
      </div>
      <button
        className={`inline-flex items-center justify-center p-[12px] rounded-[32px] ${
          input != '' ? 'bg-[#0095F6] text-white' : 'bg-[#EBEBEB] text-[#86868B]'
        }`}
        onClick={()=> props.handleSubmit(input)}
      >
        {props.loading ? <Loader/> : (input != '' || props.hideMic
          ? (
            <Icon frameClass="w-[24px] h-[24px]">
              <MsgSendIcon />
            </Icon>
          )
          : (
            <Icon frameClass="w-[24px] h-[24px]">
              <MsgMicIcon />
            </Icon>
          ))}
      </button>
    </div>
  )
}
