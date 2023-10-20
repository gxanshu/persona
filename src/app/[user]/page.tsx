'use client'
import { RefObject, useRef } from 'react'
import avatarImg from '~/assets/images/welcome-avatar.png'
import { ProfileBrain, ProfileBusiness, ProfileFace, ProfileMobile, ProfileVoice } from '~/assets/icons'
import { AboutCard } from './components/AboutCard'
import '~/styles/animation.css'
import { Card } from './components/Cards'
import { SocialCard } from './components/SocialCard'

import ModalAudio from '~/components/modals/AudioRecordingModal'
import ModalPhone from '~/components/modals/ModalPhone'
import ShareModal from '~/components/modals/ShareModal'
import ModalChat from '~/components/modals/ChatModal'
import { AvatarSection } from './components/section'

export default function ProfilePage() {
  const phoneModalRef = useRef<HTMLDialogElement>(null)
  const audioModalRef = useRef<HTMLDialogElement>(null)
  const shareModalRef = useRef<HTMLDialogElement>(null)
  const chatModalRef = useRef<HTMLDialogElement>(null)


  const openModal = (modalRef: RefObject<HTMLDialogElement>) => {
    if(modalRef.current){
      modalRef.current.showModal()
    }
  } 

  return (
    <div
      className="w-screen h-screen z-[-1] fixed"
      style={{ background: `url(${avatarImg.src}) lightgray 50% / cover no-repeat` }}
    >
      <div
        id="main-area"
        className="p-[24px] sm:p-[72px] flex items-start justify-between gap-[92px] bg-white/80 backdrop-blur-3xl h-full w-screen overflow-y-auto no-scrollbar flex-col sm:flex-row"
        // style={{ animation: 'fadeIn 0.5s' }}
      >
        {/*avatar area*/}
        <AvatarSection/>
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
          <div className="grid sm:gap-[32px] gap-[20px] grid-cols-2 sm:grid-cols-4 max-w-[800px]">
            <SocialCard className="col-span-2 row-span-2" delay={0.1} />
            <Card icon={<ProfileVoice />} text="Add a Voice" buttonHandler={()=> openModal(audioModalRef)} delay={0.2} />
            <Card icon={<ProfileFace />} text="Add a Face" delay={0.2} />
            <Card
              icon={<ProfileBusiness />}
              text="Monetize your Persona"
              containerClass="col-span-2"
              buttonHandler={()=> openModal(shareModalRef)}
              delay={0.4}
            />
            <Card icon={<ProfileMobile />} text="Get a Number" buttonHandler={()=> openModal(chatModalRef)} delay={0.5} />
            <Card icon={<ProfileBrain />} buttonHandler={()=> openModal(phoneModalRef)} text="Make it smart" delay={0.6} />
            <AboutCard containerClass="col-span-2" delay={0.7} />
          </div>
        </div>
        <span />
        <ModalAudio ref={audioModalRef} />
        <ModalPhone ref={phoneModalRef} />
        <ShareModal ref={shareModalRef} />
        <ModalChat ref={chatModalRef} />
      </div>
    </div>
  )
}
