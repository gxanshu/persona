import React from 'react'
import { AuthFlow } from '.'

interface CloneScreenProps {
  setFlow: (flow: AuthFlow) => void
}

export const CloneScreen: React.FC<CloneScreenProps> = ({ setFlow }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        className="w-[650px] rounded-[48px] py-[48px]"
        style={{ boxShadow: '0px 4px 32px 0px rgba(29, 29, 31, 0.12)' }}
      >
        <div className="inline-flex flex-col gap-[48px] w-full px-[48px]">
          {/* header */}
          <div className="flex flex-col flex-start gap-[16px]">
            <h2 className="text-[#1D1D1F] text-center text-[48px] font-[600] leading-[110%] tracking-[-0.96px]">
              Create your clone
            </h2>
            <p className="text-[#494949] text-center text-[17px] leading-[150%]">
              Clone yourself in under a minute <br /> and scale E-Commerce
            </p>
          </div>
          {/* list */}
          <p className="text-[#494949] text-center text-[17px] leading-[150%] font-[600]">
            Your clone can...
          </p>
        </div>
        <div className="flex items-start gap-[16px] w-full mt-[12px] snap-x snap-mandatory overflow-x-auto no-scrollbar ">
          <div className="snap-center shrink-0">
            <div className="shrink-0 w-4 sm:w-[100px]"></div>
          </div>
          <Card />
          <Card />
          <div className="snap-center shrink-0">
            <div className="shrink-0 w-4 sm:w-[100px]"></div>
          </div>
        </div>
        <div className="mt-[48px] w-full flex items-center justify-center">
          <button
            className="w-[185px] bg-[#1D1D1F] p-[16px] rounded-[16px] flex items-center text-white justify-center text-center text-[15px] font-[500]"
            onClick={() => setFlow('name')}
          >
            Continue -{'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

const Card: React.FC = () => {
  return <div className="min-w-[452px] min-h-[240px] bg-[#F5F5F5] rounded-[24px] snap-center shrink-0"></div>
}
