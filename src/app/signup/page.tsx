'use client'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PreTextInput, { InputState } from '~/components/inputs/PreTextInput'
import ShownError from '~/components/inputs/ShowError'
const PhoneSection = dynamic(() => import('./onboarding/PhoneSection'), {
  loading: () => <p>Loading...</p>,
})
const OtpSection = dynamic(() => import('./onboarding/OtpSection'), {
  loading: () => <p>Loading...</p>,
})
const NameSection = dynamic(() => import('./onboarding/NameSection'), {
  loading: () => <p>Loading...</p>,
})

export type authFlow = 'link' | 'phone' | 'otp' | 'name'

export default function SignUpPage() {
  const [flow, setFlow] = useState<authFlow>('phone')

  return (
    <div className="flex min-h-screen w-full max-w-[1728px] flex-col p-7 sm:p-16 lg:flex-row">
      <div className="relative flex max-w-[675px] flex-1 flex-col items-center">
        <div className="absolute top-0 flex h-full w-full max-w-[448px] flex-col">
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: 1, transform: 'none' }}
          >
            {flow == 'phone' && <PhoneSection setFlow={setFlow} />}
            {flow == 'otp' && <OtpSection setFlow={setFlow} />}
            {flow == 'name' && <NameSection setFlow={setFlow} />}
          </div>
        </div>
      </div>
    </div>
  )
}
