import React from 'react'
import { PlayIcon } from '~/assets/icons'
import avatarImg from '~/assets/images/welcome-avatar.png'
import { AuthFlow } from '.'

interface WelcomeScreenProps {
  setFlow: (flow: AuthFlow) => void
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setFlow }) => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-[48px] w-max">
        <div className="flex flex-col items-center gap-[16px] w-max">
          <h2 className="text-[#1D1D1F] text-[64px] font-[600] leading-[72px] tracking-[-1.44px]">
            Welcome, Vish
          </h2>
          <p className="text-[#494949] text-[19px] leading-[24px]">Experience the new human cloning.</p>
        </div>
        <div className="flex flex-col items-center gap-[16px] w-max">
          <div
            className="w-[80px] h-[80px] rounded-full bg-center bg-no-repeat bg-cover flex items-center justify-center"
            style={{ backgroundImage: `url(${avatarImg})`, filter: 'grayscale(40%)' }}
          >
            <PlayIcon />
          </div>
          <div className="flex p-[24px] flex-col items-center gap-[12px] rounded-[24px] bg-[#F5F5F5] text-[15px] leading-[150%] w-[340px]">
            <p className="text-center">
              Vish, this is Don, it’s my clone personally welcoming you. Crazy right? You could do the same
              for your customers too.
            </p>
            <p className="font-[500]">Benefits of cloning in E-commerce -&gt;</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] w-[340px]">
          <button
            onClick={() => setFlow('clone')}
            className="flex p-[16px] items-center gap-[12px] rounded-[16px] w-full bg-[#1D1D1F] text-[15px] font-[500] text-white justify-center"
          >
            Start Cloning
          </button>
          <button
            onClick={() => setFlow('login')}
            className="flex p-[16px] items-center gap-[12px] rounded-[16px] w-full bg-white text-[15px] font-[500] justify-center"
          >
            Skip, I’ll clone later
          </button>
        </div>
      </div>
    </div>
  )
}
