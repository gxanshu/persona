'use client'

// import { ChatHeader } from '~/components/chatpanel/ChatHeader'
// import { MessageSend } from '~/components/chatpanel/MessageSend'
// import { MsgContainer } from '~/components/chatpanel/MsgContainer'
// import { Search } from '~/components/chatpanel/Search'
// import AnimatedModal from '~/components/modals/AnimatedModal'
// import { useEffect, useRef } from 'react'

// export default function TestingPage() {
//   const modalRef = useRef<HTMLDialogElement>(null)

//   useEffect(() => {
//     if (modalRef) {
//       modalRef.current?.showModal()
//     }
//   })

//   return (
//     <>
//       <AnimatedModal ref={modalRef} containerClass="w-max p-[12px]">
//         <div className="w-full flex">
//           <div className="flex flex-col border-r max-w-max">
//             <div className="flex items-center justify-center p-[12px]">
//               <ChatHeader onClick={() => console.log('ok')} />
//             </div>
//             <div className="px-[12px] pb-[8px] pt-[4px] border-b">
//               <Search />
//             </div>
//             <div className="inline-flex flex-col gap-[2px] max-h-[450px] overflow-x-hidden overflow-y-auto p-[4px] no-scrollbar">
//               <MsgContainer msg="This is a new message with multi line support, with ellipsis support and here we go" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//               <MsgContainer msg="This is a new message with 1 line" />
//             </div>
//           </div>
//           <div className="flex flex-col justify-between">
//             <div className="p-[12px]">
//               <div className="w-full h-[36px] bg-[#D9D9D9]" />
//             </div>
//             <div className="p-[12px]">
//               <MessageSend />
//             </div>
//           </div>
//         </div>
//       </AnimatedModal>
//     </>
//   )
// }

import React, { useState } from 'react';

const RecordingButton = () => {
  const [buttonState, setButtonState] = useState('Start Recording');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleButtonClick = () => {
    if (buttonState === 'Start Recording') {
      // Start recording
      setButtonState('Stop Recording');
      setIsDeleted(false);
    } else if (buttonState === 'Stop Recording') {
      // Stop recording
      setButtonState('Play');
      setIsPlaying(true);
      setIsDeleted(true);
    } else if (buttonState === 'Play') {
      // Play
      setButtonState('stop Playing');
      setIsPlaying(false);
      // Add your logic for play functionality here
    }
    else if (buttonState === 'stop Playing') {
      // Play
      setButtonState('Play');
      setIsPlaying(false);
      // Add your logic for play functionality here
    }
  };

  return (
    <div>
      <button className='bg-green-500 p-4 mx-[10px]' onClick={handleButtonClick}>
        {buttonState}
      </button>
      {isDeleted && (
        <button className='bg-blue-500 p-4 mx-[10px]' onClick={() => {setButtonState('Start Recording'); setIsDeleted(false)}}>
          Delete
        </button>
      )}
    </div>
  );
};

export default RecordingButton;


