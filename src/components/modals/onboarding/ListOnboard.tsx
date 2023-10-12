import { animate } from '~/lib'

interface ModalStartListProps {
  step: () => void
}

export const ModalStartList: React.FC<ModalStartListProps> = props => {
  return (
    <div className="flex flex-col items-center justify-between p-[64px] gap-[48px]">
      <div className="flex flex-col gap-[24px] items-center">
        <div className="w-full flex flex-col items-center gap-[12px]">
          <div className="h-[64px] w-[64px] bg-gray-100" />
          <h2 className="break-words text-center text-[33px] leading-[40px] font-[700]">
            This could be sensitive to view. are you sure?
          </h2>
        </div>
        <div className="flex items-center flex-col gap-[12px]">
          <ListItem
            emoji="📱"
            subText="A dedicated number for your users to chat with your Persona. Don’t worry it’s AI managed."
            delay={0.1}
          />
          <ListItem
            emoji="🤯"
            subText="Your Persona can be trained. It can learn from you, and behave like you."
            delay={0.2}
          />
          <ListItem
            emoji="💰"
            subText="Your Persona can be trained. It can learn from you, and behave like you."
            delay={0.3}
          />
        </div>
      </div>
      <button
        onClick={() => props.step()}
        className="p-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[15px] leading-[20px] font-[500] bg-[#F2F2F2] w-full"
      >
        I'm sure
      </button>
    </div>
  )
}

interface ListItemProps {
  emoji: string
  subText: string
  delay: number
}

const ListItem: React.FC<ListItemProps> = ({ emoji, delay, subText }) => {
  return (
    <div className="flex flex-start gap-[96px]" style={{ ...animate({ name: 'fadeIn', delay }), opacity: 0 }}>
      <div className="flex gap-[12px]">
        <p className="text-center text-[24px] leading-[150%]">{emoji}</p>
        <p className="text-[#494949] text-[15px] leading-[150%] w-[356px]">{subText}</p>
      </div>
    </div>
  )
}
