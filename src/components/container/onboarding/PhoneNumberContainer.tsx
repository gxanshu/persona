import { Lexend, Lexend_Giga } from 'next/font/google'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import NumberInput from '~/components/inputs/NumberInput'
import { AuthFlow } from '.'
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })
const lexendGiga = Lexend_Giga({ subsets: ['latin'], weight: ['600', '400'] })

const PhoneNumberContainer = (props: { setFlow: Dispatch<SetStateAction<AuthFlow>> }) => {
  const [value, setValue] = useState<string>('')
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (value.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [value])

  return (
    <div className="flex flex-col gap-[32px] items-center max-w-[90%] sm:max-w-full">
      <div className={`flex flex-col gap-[12px] w-[390px] ${lexend.className}`}>
        <h2
          className={`hidden sm:block text-[#1D1D1F] text-center text-[21px] font-semibold tracking-[-0.42px]`}
        >
          Get your Persona
        </h2>
        <h2
          className={`sm:hidden text-[#1D1D1F] text-center text-[33px] sm:text-[21px] font-semibold tracking-[-5.28px] ${lexendGiga.className}`}
        >
          Clone yourself.
        </h2>
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-[#494949] w-[55%] text-[15px] leading-[150%] text-center">
            The most advanced version of yourself. It’s Free.
          </p>
        </div>
      </div>
      <div className="inline-flex flex-col gap-[24px] w-full">
        <form
          onSubmit={e => {
            e.preventDefault()
            props.setFlow('otp')
          }}
        >
          <NumberInput
            label="Phone number"
            value={value}
            setValue={setValue}
            handleSubmit={() => props.setFlow('otp')}
            buttonDisabled={buttonDisabled}
          />
        </form>
        <div className="inline-flex flex-col gap-[8px]">
          <button
            onClick={() => props.setFlow('otp')}
            className="text-white text-[15px] leading-[20px] flex items-center justify-center bg-[#187EE7] rounded-[16px] p-[16px]"
          >
            Continue
          </button>
          <button className="text-[#1D1D1F] text-[15px] leading-[20px] flex items-center justify-center bg-white rounded-[16px] p-[16px]">
            Discover Persona
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhoneNumberContainer
