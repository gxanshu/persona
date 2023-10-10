'use client'
import { ChatHeader } from '~/components/chatpanel/ChatHeader'
import { MessageSend } from '~/components/chatpanel/MessageSend'
import { MsgContainer } from '~/components/chatpanel/MsgContainer'
import { Search } from '~/components/chatpanel/Search'
import AnimatedModal from '~/components/modals/AnimatedModal'
import { SocialCard } from '../profile/components/SocialCard'
import { useEffect, useRef } from 'react'

export default function TestingPage() {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (modalRef) {
      modalRef.current?.showModal()
    }
  })

  return (
    <>
      <AnimatedModal ref={modalRef} containerClass="w-max p-[12px]">
        <div className="w-full flex">
          <div className="flex flex-col border-r max-w-max">
            <div className="flex items-center justify-center p-[12px]">
              <ChatHeader />
            </div>
            <div className="px-[12px] pb-[8px] pt-[4px] border-b">
              <Search />
            </div>
            <div className="inline-flex flex-col gap-[2px] max-h-[450px] overflow-x-hidden overflow-y-auto p-[4px] no-scrollbar">
              <MsgContainer msg="This is a new message with multi line support, with ellipsis support and here we go" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
              <MsgContainer msg="This is a new message with 1 line" />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="p-[12px]">
              <div className="w-full h-[36px] bg-[#D9D9D9]" />
            </div>
            <div className="p-[12px]">
              <MessageSend />
            </div>
          </div>
        </div>
      </AnimatedModal>
    </>
  )
}
