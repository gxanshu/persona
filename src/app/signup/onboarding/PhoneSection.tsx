'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TextInput } from '~/components/inputs'
import { authFlow } from '../page'

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
      <p className="text-[#494949] mb-[16px] font-[17px] leading-[24px] ">persona.me/vish is available!</p>
      <h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">Let’s create your account</h1>
      <div>
        <div className="mt-20 mb-4">
          <TextInput
            label="Your Email"
            name="full-email"
            type="email"
            value={value}
            required={true}
            setValue={(value: string) => setValue(value)}
            actionButton={true}
            disabled={false}
            buttonDisabled={buttonDisabled}
            haveError={() => false}
            handleSubmit={() => props.setFlow('otp')}
            className="w-[425px] rounded-[13px]"
          />
        </div>
      </div>
    </div>
  )
}
