import { animate } from '~/lib'
import {
  SiriOrb, BlackWaveOrb, BlueWaveOrb, ColorWaveOrb
} from '~/components/orbs/'
import { useState } from 'react'

interface ModalStartListProps {
  step: () => void
}

export const ModalStartList: React.FC<ModalStartListProps> = props => {
  const [step, setStep] = useState(0);
  return (
    <div className="flex flex-col items-center justify-between sm:p-[64px] p-[48px] h-full gap-[48px]">
      <div className="flex flex-col gap-[24px] items-center">
        <div className="w-full flex flex-col items-center gap-[12px]">
          {step == 3 && <BlackWaveOrb className='h-[64px] w-[64px] bg-black' />}
          {step == 2 && <BlueWaveOrb className='h-[64px] w-[64px]' />}
          {step == 1 && <ColorWaveOrb className='h-[64px] w-[64px]' />}
          {step == 0 && <SiriOrb className='h-[64px] w-[64px]' />}
          <h2 className="break-words text-center text-[33px] leading-[40px] font-[700]">
            Clone your Voice
          </h2>
        </div>
        <div className="flex items-start flex-col gap-[12px]">
          <ListItem
            emoji="⏰"
            heading='60 seconds recording'
            subText='Need at least 60 seconds for the best results'
            delay={0.1}
          />
          <ListItem
            emoji="🤫"
            heading='Quiet environment'
            subText="Make sure there's no background noise"
            delay={0.2}
          />
        </div>
      </div>
      <button
        // onClick={() => props.step()}
      onClick={()=> {
        if(step == 3) {setStep(0)} else {setStep((prev)=> prev+1)};
      }}
        className="p-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[15px] leading-[20px] font-[500] bg-[#F2F2F2] w-full outline-none"
      >
        Start cloning
      </button>
    </div>
  )
}

interface ListItemProps {
  emoji: string
  subText: string
  delay: number
  heading: string
}

const ListItem: React.FC<ListItemProps> = ({ emoji, delay, subText, heading }) => {
  return (
    <div className="flex flex-start gap-[96px]" style={{ ...animate({ name: 'fadeIn', delay }), opacity: 0 }}>
      <div className="flex gap-[12px]">
        <p className="text-center text-[24px] leading-[150%]">{emoji}</p>
        <div className='text-[#494949] text-[15px] leading-[150%]'>
          <h3 className='font-[500]'>{heading}</h3>
          <p className='font-[400]'>{subText}</p>
        </div>
      </div>
    </div>
  )
}

export default ModalStartList
