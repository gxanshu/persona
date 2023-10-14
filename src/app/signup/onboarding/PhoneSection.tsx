'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { authFlow } from '../page'
import NumberInput from '~/components/inputs/NumberInput'

export default function PhoneSection(props: { setFlow: Dispatch<SetStateAction<authFlow>> }) {
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
    <div className="flex w-full flex-col">
      <h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">Get your Persona</h1>
      <p className="text-[#494949] mt-[16px] font-[17px] leading-[24px] ">It’s Free</p>
      <div>
        <div className="mt-20 mb-4">
          <NumberInput
            label="Your Number"
            value={value}
            setValue={setValue}
            handleSubmit={() => props.setFlow('otp')}
            buttonDisabled={buttonDisabled}
            actionButton
          />
        </div>
      </div>
    </div>
  )
}
