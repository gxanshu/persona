import Image from 'next/image'
import { Icon, Logo, PanelPen } from '~/assets/icons'
import avatarImg from '~/assets/images/welcome-avatar.png'

interface Props {
  onClick: () => void
}

export const ChatHeader = (props: Props) => {
  return (
    <div className="inline-flex justify-center gap-[94px]">
      <Image
        src={avatarImg}
        className="h-[36px] w-[36px] rounded-full"
        style={{ background: 'lightgray 50% / cover no-repeat' }}
        alt="user avatar"
      />
      <div className="p-[6px]" onClick={props.onClick}>
        <Icon frameClass="h-[24px] w-[24px]">
          <Logo />
        </Icon>
      </div>
      <div className="inline-flex p-[8px] bg-[#0095F6] rounded-full">
        <Icon frameClass="h-[20px] w-[20px]">
          <PanelPen />
        </Icon>
      </div>
    </div>
  )
}
