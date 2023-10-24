'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { Icon, ProfileMobile } from '~/assets/icons'
import avatarImg from '~/assets/images/welcome-avatar.png'

export const AvatarSection = () => {
  const [name, setName] = useState('vish')
  const [bio, setBio] = useState('')

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

  return (
    <div className="inline-flex flex-col gap-[32px] sm:sticky sm:top-20 sm:z-[1] self-start">
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
  )
}
