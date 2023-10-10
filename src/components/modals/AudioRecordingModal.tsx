import { Icon, ProfileModalCross } from '~/assets/icons'
import AnimatedModal from './AnimatedModal'
import dynamic from 'next/dynamic'
import { ForwardedRef, forwardRef } from 'react'
const AudioModal = dynamic(() => import('~/components/sections/auth/AudioScreen'))

interface ModalAudioProps {}

const ModalAudio = forwardRef(({}, ref: ForwardedRef<HTMLDialogElement>) => {
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
    <AnimatedModal ref={ref}>
      <div className="w-full h-full relative">
        <div className="p-[64px]">
          <AudioModal text="Add a Voice" subText="Record or upload 1 min audio. Our AI will clone it." />
        </div>
        <button
          className="h-[40px] w-[40px] flex items-center justify-center bg-[#EBEBEB] rounded-full absolute top-[24px] right-[24px]"
          onClick={closeModal}
        >
          <Icon frameClass="h-[24px] w-[24px]">
            <ProfileModalCross />
          </Icon>
        </button>
      </div>
    </AnimatedModal>
  )
})

export default ModalAudio
