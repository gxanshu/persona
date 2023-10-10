'use client'
import { ChangeEvent, useRef, useState } from 'react'
import avatarImg from '~/assets/images/welcome-avatar.png'
import { Icon, ProfileBrain, ProfileBusiness, ProfileFace, ProfileMobile, ProfileVoice } from '~/assets/icons'
import Image from 'next/image'
import { AboutCard } from './components/AboutCard'
import '~/styles/animation.css'
import { Card } from './components/Cards'
import { SocialCard } from './components/SocialCard'

import ModalAudio  from '~/components/modals/AudioRecordingModal'
import ModalPhone from '~/components/modals/ModalPhone'

export default function ProfilePage() {
  const [name, setName] = useState('vish')
  const [bio, setBio] = useState('')
  const phoneModalRef = useRef<HTMLDialogElement>(null)
  const audioModalRef = useRef<HTMLDialogElement>(null)

  const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value)
    // Auto-adjust the textarea's height based on its content
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handleBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value
    if (inputText.length <= 280) {
      setBio(inputText)
      e.target.style.height = 'auto'
      e.target.style.height = e.target.scrollHeight + 'px'
    }
  }

  const openPhoneModal = () => {
    console.log(phoneModalRef)
    if(phoneModalRef.current){
      phoneModalRef.current.showModal()
    }
  }

  const openAudioModal = () => {
    console.log(audioModalRef)
    if(audioModalRef.current){
      audioModalRef.current.showModal()
    }
  }

  return (
    <div
      className="w-screen h-screen z-[-1] fixed"
      style={{ background: `url(${avatarImg.src}) lightgray 50% / cover no-repeat` }}
    >
      <div
        id="main-area"
        className="p-[72px] flex items-start justify-between gap-[92px] bg-white/80 backdrop-blur-3xl h-full w-screen overflow-y-auto no-scrollbar"
        style={{ animation: 'fadeIn 0.5s' }}
      >
        {/*avatar area*/}
        <div className="inline-flex flex-col gap-[32px] sticky top-20 z-[1] self-start">
          <Image
            src={avatarImg}
            className="w-[150px] h-[150px] rounded-full"
            alt="user profile icon"
            style={{ background: 'lightgray 50% / cover no-repeat' }}
          />
          <div className="flex flex-col gap-[8px]">
            <textarea
              className="text-[33px] font-[600] leading-[40px] tracking-[-0.66px] text-[#1D1D1F] bg-transparent outline-none border-none max-w-[200px] max-w-[270px]"
              placeholder="Your name"
              spellCheck="false"
              style={{ height: 40 }}
              rows={1}
              value={name}
              onChange={handleNameChange}
            >
            </textarea>
            <div className="flex items-center gap-[8px] text-[#494949]">
              <p className="text-[15px] leading-[20px]">Vish V.</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <circle cx="1" cy="1" r="1" fill="#1D1D1F" />
              </svg>
              <p className="text-[15px] leading-[20px]">110K Followers</p>
            </div>
            <textarea
              className="text-[20px] font-[500] leading-[150%] text-[#1D1D1F] bg-transparent outline-none border-none max-w-full"
              style={{ height: 40 }}
              rows={1}
              spellCheck="false"
              placeholder="Your bio"
              value={bio}
              onChange={handleBio}
            >
            </textarea>
            {bio.length > 10
              ? <p className="text-[12px] leading-[20px]">{bio.length}/280 characters</p>
              : (null)}
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
          <SocialCard className='col-span-2 row-span-2' delay={0.1}/>
            <Card
              icon={<ProfileVoice />}
              text="Add a Voice"
              buttonHandler={openAudioModal}
              delay={0.2}
            />
            <Card icon={<ProfileFace />} text="Add a Face" delay={0.2} />
            <Card
              icon={<ProfileBusiness />}
              text="Monetize your Persona"
              containerClass="col-span-2"
              delay={0.4}
            />
            <Card
              icon={<ProfileMobile />}
              text="Get a Number"
              buttonHandler={openPhoneModal}
              delay={0.5}
            />
            <Card icon={<ProfileBrain />} text="Make it smart" delay={0.6} />
            <AboutCard containerClass="col-span-2" delay={0.7} />
          </div>
        </div>
        <span />
        <ModalAudio ref={audioModalRef}/>
        <ModalPhone ref={phoneModalRef}/>
      </div>
    </div>
  )
}

