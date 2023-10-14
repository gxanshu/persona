'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
const NumberContainer = dynamic(() => import('./PhoneNumberContainer'), {
  loading: () => <p>Loading...</p>,
})
const OtpContainer = dynamic(() => import('./OtpContainer'), {
  loading: () => <p>Loading...</p>,
})
const NameContainer = dynamic(() => import('./NameContainer'), {
  loading: () => <p>Loading...</p>,
})

export type AuthFlow = 'number' | 'otp' | 'name'

export const AuthFlow = () => {
  const [step, setStep] = useState<AuthFlow>('number')

  return (
    <div className="sm:max-w-[390px] sm:min-h-[300px]">
      {step == 'number' && <NumberContainer setFlow={setStep} />}
      {step == 'otp' && <OtpContainer setFlow={setStep} />}
      {step == 'name' && <NameContainer setFlow={setStep} />}
    </div>
  )
}
