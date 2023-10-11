import { FC, ReactNode } from 'react'
import { Icon, ProfileBusiness, ProfileCake, ProfileLang, ProfilePlus, ProfileWork } from '~/assets/icons'
import { ProfileCard } from '~/components/container'

interface AboutCardProps {
  containerClass?: string
  delay: number
}

export const AboutCard: FC<AboutCardProps> = ({ delay, containerClass }) => {
  return (
    <ProfileCard className={containerClass} delay={delay}>
      <div className="flex flex-col gap-[20px] w-full h-full">
        <div className="flex gap-[8px] items-center justify-between w-full">
          <p className="text-[#1D1D1F] text-[19px] leading-[24px] font-[600]">About</p>
          <Icon
            frameClass="h-[8px] w-[8px]"
            containerClass="flex p-[8px] items-center justify-center rounded-[24px] bg-[#F5F5F5]"
          >
            <ProfilePlus />
          </Icon>
        </div>
        <div className="flex gap-[20px] max-w-full overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-[16px] min-w-full">
            <AboutCardList icon={<ProfileCake />} text="Oct 20, 2023" />
            <AboutCardList icon={<ProfileBusiness />} text="Works at BHuman AI" />
            <AboutCardList icon={<ProfileWork />} text="Sales Specialist" />
          </div>
          <div className="flex flex-col gap-[16px] min-w-full">
            <AboutCardList icon={<ProfileLang />} text="English, French, +3" />
          </div>
        </div>
      </div>
    </ProfileCard>
  )
}

export const AboutCardList = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <Icon frameClass="h-[20px] w-[20px]">
        {icon}
      </Icon>
      <p className="text-[15px] leading-[20px]">{text}</p>
    </div>
  )
}
