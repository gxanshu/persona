'use client'
import React, { useState } from 'react'
import { TextInput } from '~/components/inputs'
import { AuthFlow } from '.'

interface NameScreenProps {
  setFlow: (flow: AuthFlow) => void
}

export const NameScreen: React.FC<NameScreenProps> = ({ setFlow }) => {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const isName = () => (value !== '' ? true : false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (value === '') return
    setFlow('audio')
  }

  return (
    <div className="w-[650px] h-[548px] rounded-[48px] py-[48px] flex flex-col items-center justify-center absolute left-0 top-0 bottom-0 right-0 m-auto">
      <h1 className="text-[#1D1D1F] text-center text-[48px] font-[600] leading-[110%] tracking-[-0.96px]">
        Let's name it
      </h1>
      <div className="flex flex-col gap-[48px] mt-[16px]">
        <p className="text-[#494949] text-center text-[17px] leading-[150%]">Give your clone a name</p>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Your Name"
            name="username"
            value={value}
            required={true}
            setValue={setValue}
            actionButton={isName()}
            disabled={loading}
            haveError={() => error}
          />
        </form>
      </div>
    </div>
  )
}
