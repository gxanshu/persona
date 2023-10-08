'use client'
import { useState } from 'react'
import avatarImg from '~/assets/images/welcome-avatar.png'
import { Icon, ProfileBrain, ProfileBusiness, ProfileFace, ProfileMobile, ProfileVoice } from '~/assets/icons'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { AboutCard } from './components/AboutCard'
import { ProfileCard } from '~/components/container'
import '~/styles/animation.css'

const ModalAudio = dynamic(() => import('~/components/modals/AudioRecordingModal'))
const ModalPhone = dynamic(() => import('~/components/modals/ModalPhone'))

export default function ProfilePage() {
  const [modal, setModal] = useState({
    voice: false,
    number: false,
  })

  return (
    <div
      className="h-screen w-screen p-[72px] flex relative items-start justify-between gap-[92px]"
      style={{ animation: 'fadeIn 0.5s' }}
    >
      {/*avatar area*/}
      <div className="inline-flex flex-col gap-[32px]">
        <Image
          src={avatarImg}
          className="w-[150px] h-[150px] rounded-full"
          alt="user profile icon"
          style={{ background: 'lightgray 50% / cover no-repeat' }}
        />
        <div className="flex flex-col gap-[8px]">
          <h2 className="text-[33px] font-[600] leading-[40px] tracking-[-0.66px] text-[#1D1D1F]">vish</h2>
          <div className="flex items-center gap-[8px] text-[#494949]">
            <p className="text-[15px] leading-[20px]">Vish V.</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
              <circle cx="1" cy="1" r="1" fill="#1D1D1F" />
            </svg>
            <p className="text-[15px] leading-[20px]">110K Followers</p>
          </div>
        </div>
        <div className="flex py-[16px] px-[24px] items-center rounded-[24px] bg-[#F5F5F5]">
          <div className="flex justify-center items-start gap-[4px] min-w-[175px]">
            <Icon frameClass="h-[20px] w-[20px]">
              <ProfileMobile />
            </Icon>
            <p className="text-[15px] leading-[20px] font-[500] text-[#1D1D1F]">+1 983-556-4321</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex gap-[96px] w-full">
          <div className="flex flex-col gap-[8px]">
            <h3 className="text-[#1D1D1F] text-[21px] font-[500] leading-[24px]">
              Getting your Persona ready
            </h3>
            <p className="text-[#494949] text-[15px] leading-[20px]">
              Your AI persona is just a few steps away.
            </p>
          </div>
          <div className="bg-[#D9D9D9] h-[32px] w-[32px]" />
        </div>
        <div className="grid gap-[32px] grid-cols-4 max-w-[800px]">
          <Card
            icon={<ProfileVoice />}
            text="Add a Voice"
            buttonHandler={() => setModal(prevValue => ({ ...prevValue, voice: true }))}
            delay={0.1}
          />
          <Card icon={<ProfileFace />} text="Add a Face" delay={0.2} />
          <Card
            icon={<ProfileBusiness />}
            text="Monetize your Persona"
            containerClass="col-span-2"
            delay={0.3}
          />
          <Card
            icon={<ProfileMobile />}
            text="Get a Number"
            buttonHandler={() => setModal(prevValue => ({ ...prevValue, number: true }))}
            delay={0.4}
          />
          <Card icon={<ProfileBrain />} text="Make it smart" delay={0.5} />
          <AboutCard containerClass="col-span-2" delay={0.6} />
        </div>
      </div>
      <span />
      <ModalAudio show={modal.voice} onClose={() => setModal(prevValue => ({ ...prevValue, voice: false }))} />
      <ModalPhone show={modal.number} onClose={() => setModal(prevValue => ({ ...prevValue, number: false }))}/>
    </div>
  )
}

const Card: React.FC<{
  icon: React.ReactNode
  text: string
  containerClass?: string
  buttonHandler?: () => void
  delay: number
}> = props => {
  return (
    <ProfileCard className={props.containerClass} delay={props.delay}>
      <div className="flex flex-col gap-[12px] max-h-[140px] max-w-[136px] w-full">
        <div className="flex flex-col gap-[32px]">
          <Icon frameClass="h-[36px] w-[36px]">{props.icon}</Icon>
        </div>
        <div className="h-[44px] flex items-end">
          <p className="text-[17px] font-[500] text-[#1D1D1F] leading-[24px]">{props.text}</p>
        </div>
        <button
          className="py-[8px] px-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[13px] leading-[20px] font-[500] bg-[#F2F2F2] w-full"
          onClick={props.buttonHandler}
        >
          Start
        </button>
      </div>
    </ProfileCard>
  )
}
