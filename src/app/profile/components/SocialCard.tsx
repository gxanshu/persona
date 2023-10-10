import { FC, ReactNode } from 'react'
import { AtIcon, GithubIcon, InstagramIcon, LinkdinIcon, TwitterIcon } from '~/assets/icons'
import { ProfileCard } from '~/components/container'
import { SocialList } from './SocialList'

export const SocialCard = ({className, delay}: {className?: string, delay: number}) => {
  return (
    <ProfileCard className={`${className}`} delay={delay}>
      <div>
        <p className="mb-10 px-2.5 pt-2.5 text-xl font-semibold">
          Add your social media accounts to your Persona
        </p>
        <div className="flex max-h-[250px] flex-1 flex-col overflow-y-auto gap-3 no-scrollbar">
          <SocialList icon={<TwitterIcon/>} delay={0.2} />
          <SocialList icon={<InstagramIcon/>} delay={0.4}/>
          <SocialList icon={<GithubIcon/>} delay={0.6}/>
          <SocialList icon={<LinkdinIcon/>} delay={0.8}/>
          <SocialList icon={<TwitterIcon/>} delay={1}/>
          <SocialList icon={<TwitterIcon/>} delay={1.2}/>
          <SocialList icon={<TwitterIcon/>} delay={1.4}/>
          <SocialList icon={<TwitterIcon/>} delay={1.6}/>
          <SocialList icon={<TwitterIcon/>} delay={1.8}/>
          <SocialList icon={<TwitterIcon/>} delay={2}/>
        </div>
      </div>
    </ProfileCard>
  )
}
