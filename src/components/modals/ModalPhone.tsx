import { useState } from 'react'
import { AnimatedModal } from './AnimatedModal'
import { Icon, ProfileModalCross } from '~/assets/icons'

interface ModalPhoneProps {
  onClose: () => void
}

const ModalPhone: React.FC<ModalPhoneProps> = props => {
  const [inputNumber, setInputNumber] = useState<string>('')
  const [selectList, setSelectList] = useState<number | null>(null)
  const [step, setStep] = useState<boolean>(true)

  return (
    <AnimatedModal>
      {step
        ? <ModalStartList onClose={() => props.onClose()} step={() => setStep(false)} />
        : (
          <div className="w-full h-full flex flex-col justify-center relative pb-[64px]">
            <div className="inline-flex flex-col items-center gap-[48px] px-[64px] pt-[64px]">
              <div className="flex flex-col items-center gap-[16px]">
                <h2 className="text-[33px] leading-[40px] font-[600]">New Phone Number</h2>
                <p className="text-[15px] leading-[150%] text-[#494949] text-center max-w-[258px]">
                  Your followers will text here. Your persona AI responds
                </p>
              </div>
              <div className="min-w-[300px]">
                <div className="flex p-[16px] items-center gap-[12px] rounded-[32px] bg-[#F5F5F5] w-full">
                  <input
                    type="text"
                    className="w-full placeholder:text-[#86868B] text-[17px] leading-[24px] bg-[#F5F5F5] outline-none no-controller"
                    placeholder="Search"
                    value={inputNumber}
                    onChange={event => setInputNumber(event.target.value)}
                  />
                </div>
              </div>
            </div>
            {inputNumber !== '' && (
              <div className="w-full my-[24px]">
                <div className="flex items-start gap-[16px] w-full mt-[12px] snap-x snap-mandatory overflow-x-auto no-scrollbar">
                  <div className="snap-center shrink-0">
                    <div className="shrink-0 w-4 sm:w-[100px]"></div>
                  </div>
                  <div className="min-w-max grid grid-row-3 grid-cols-3 gap-x-[10px] gap-y-[12px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center py-[12px] px-[16px] rounded-[12px] border border-[2px] bg-white cursor-pointer ${
                          selectList === index ? 'border-black' : ''
                        }`}
                        onClick={() => setSelectList(index)}
                      >
                        <p className="min-w-[151px] text-[#1D1D1F] text-[15px] leading-[20px] text-center">
                          +1 983-556-4321
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="snap-center shrink-0">
                    <div className="shrink-0 w-4 sm:w-[100px]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      <button
        className="h-[40px] w-[40px] flex items-center justify-center bg-[#EBEBEB] rounded-full absolute top-[24px] right-[24px]"
        onClick={() => props.onClose()}
      >
        <Icon frameClass="h-[24px] w-[24px]">
          <ProfileModalCross />
        </Icon>
      </button>
    </AnimatedModal>
  )
}

interface ModalStartListProps {
  onClose: () => void
  step: () => void
}

const ModalStartList: React.FC<ModalStartListProps> = props => {
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
          />
          <ListItem
            emoji="🤯"
            subText="Your Persona can be trained. It can learn from you, and behave like you."
          />
          <ListItem
            emoji="💰"
            subText="Your Persona can be trained. It can learn from you, and behave like you."
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
}

const ListItem: React.FC<ListItemProps> = props => {
  return (
    <div className="flex flex-start gap-[96px]">
      <div className="flex gap-[12px]">
        <p className="text-center text-[24px] leading-[150%]">{props.emoji}</p>
        <p className="text-[#494949] text-[15px] leading-[150%] w-[356px]">{props.subText}</p>
      </div>
    </div>
  )
}

interface ModalStartPhotoProps {
  onClose: () => void
  step: () => void
}

const ModalStartPhoto: React.FC<ModalStartPhotoProps> = props => {
  return (
    <div className="flex flex-col items-center justify-between pt-[74px] gap-[48px] w-full">
      <div className="flex gap-[20px] max-w-full snap-x snap-mandatory overflow-x-auto no-scrollbar">
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-[40px]"></div>
        </div>
        <CardSection />
        <CardSection />
        <CardSection />
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-[40px]"></div>
        </div>
      </div>
      <div className="px-[64px] pb-[64px] w-full">
        <button
          onClick={() => props.step()}
          className="p-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[15px] leading-[20px] font-[500] bg-[#F2F2F2] w-full"
        >
          I'm sure
        </button>
      </div>
    </div>
  )
}

const CardSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-[16px] min-w-[400px]">
      <div className="w-full h-[250px] bg-gray-50 rounded-xl" />
      <h2 className="break-words text-center text-[33px] leading-[40px] font-[700]">Watch Premium Content</h2>
      <p className="w-[90%] text-[#494949] text-[15px] leading-[150%] text-center">
        A dedicated number for your users to chat with your Persona. Don’t worry it’s AI managed.
      </p>
    </div>
  )
}

export default ModalPhone
