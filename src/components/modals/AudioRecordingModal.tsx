import { FC } from 'react'
import { Icon, ProfileModalCross } from '~/assets/icons'
import { AnimatedModal } from './AnimatedModal'
import dynamic from 'next/dynamic'
const AudioModal = dynamic(() => import('~/components/sections/auth/AudioScreen'))

interface ModalAudioProps {
  onClose: () => void
  show: boolean
}

export const ModalAudio: FC<ModalAudioProps> = ({ onClose, show }) => {
  return (
    <AnimatedModal show={show}>
      <div className="w-full h-full relative">
        <div className="p-[64px]">
          <AudioModal text="Add a Voice" subText="Record or upload 1 min audio. Our AI will clone it." />
        </div>
        <button
          className="h-[40px] w-[40px] flex items-center justify-center bg-[#EBEBEB] rounded-full absolute top-[24px] right-[24px]"
          onClick={() => onClose()}
        >
          <Icon frameClass="h-[24px] w-[24px]">
            <ProfileModalCross />
          </Icon>
        </button>
      </div>
    </AnimatedModal>
  )
}

export default ModalAudio
