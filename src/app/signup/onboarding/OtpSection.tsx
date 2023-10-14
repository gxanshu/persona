'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { authFlow } from '../page'
import OTPInput from '~/components/inputs/OtpInput'

export default function OtpSection(props: { setFlow: Dispatch<SetStateAction<authFlow>> }) {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOtpSubmit = (otp: string) => {
    console.log(otp)
    setTimeout(() => {
      props.setFlow('name')
    }, 1000)
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">Check your Phone</h1>
      <p className="text-[#494949] mt-[16px] font-[17px] leading-[24px] ">
        Enter the 6-digit code we’ve texted you
      </p>
      <div>
        <div className="mt-20 mb-4">
          <OTPInput
            handleOtpSubmit={handleOtpSubmit}
            disabled={loading}
            haveError={error as string}
            setError={setError}
          />
        </div>
      </div>
    </div>
  )
}
