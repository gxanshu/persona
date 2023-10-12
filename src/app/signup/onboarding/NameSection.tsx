'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TextInput } from '~/components/inputs'
import { authFlow } from '../page'

export default function NameSection(props: { setFlow: Dispatch<SetStateAction<authFlow>> }) {
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
    <h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">What’s your name?</h1>
      <p className="text-[#494949] mt-[16px] font-[17px] leading-[24px] ">Enter your full name</p>
      <div>
        <div className="mt-20 mb-4">
          <TextInput
            label="Your Name"
            name="full-name"
            value={value}
            required={true}
            setValue={(value: string) => setValue(value)}
            actionButton={true}
            disabled={false}
            buttonDisabled={buttonDisabled}
            haveError={() => false}
            handleSubmit={() => props.setFlow('name')}
            className="w-[425px] rounded-[13px]"
          />
        </div>
      </div>
    </div>
  )
}
