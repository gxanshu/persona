'use client'
import { ChatHeader } from '~/components/chatpanel/ChatHeader'
import { MessageSend } from '~/components/chatpanel/MessageSend'
import { MsgContainer } from '~/components/chatpanel/MsgContainer'
import { Search } from '~/components/chatpanel/Search'
import AnimatedModal from '~/components/modals/AnimatedModal'
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react'

interface ModalChatProps {}

const ModalChat = forwardRef(({}, ref: ForwardedRef<HTMLDialogElement>) => {

  const closeModal = () => {
    if (ref) {
      // @ts-ignore
      ref.current.classList.add('modal-exit')
      // @ts-ignore
      ref.current.addEventListener('animationend', function() {
        // @ts-ignore
        ref.current.classList.remove('modal-exit')
        // @ts-ignore
        ref.current.close()
      }, { once: true })
    }
  }

  return (
    <>
      <AnimatedModal ref={ref} containerClass="w-max p-[12px] overflow-hidden">
        <div className="w-full flex">
          <div className="flex flex-col border-r max-w-max">
            <div className="flex items-center justify-center p-[12px]">
              <ChatHeader onClick={closeModal} />
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
})

export default ModalChat