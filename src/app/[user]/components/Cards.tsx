import { Icon } from '~/assets/icons'
import { ProfileCard } from '~/components/container'

export const Card: React.FC<{
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
