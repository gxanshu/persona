'use client'
import { useState } from 'react'
import AudioModal from './AudioScreen'
import { NewAuthPage } from './AuthScreen'
import { CloneScreen } from './CloneScreen'
import { NameScreen } from './NameScreen'
import { WelcomeScreen } from './WelcomeScreen'

export type AuthFlow = 'login' | 'welcome' | 'clone' | 'name' | 'audio'

export default function AuthSection() {
  const [authFlow, setAuthFlow] = useState<AuthFlow>('login')
  return (
    <div className='w-full h-screen'>
      {authFlow === 'login' && <NewAuthPage setFlow={setAuthFlow} />}
      {authFlow === 'welcome' && <WelcomeScreen setFlow={setAuthFlow} />}
      {authFlow === 'clone' && <CloneScreen setFlow={setAuthFlow} />}
      {authFlow === 'name' && <NameScreen setFlow={setAuthFlow} />}
      {authFlow === 'audio' && <AudioScreen />}
    </div>
  )
}

const AudioScreen = () => {
  return (
    <div
      className="w-[650px] h-[637px] rounded-[48px] flex flex-col items-center absolute left-0 top-0 bottom-0 right-0 m-auto bg-white"
      style={{boxShadow: "0px 4px 32px 0px rgba(29, 29, 31, 0.12)"}}
    >
      <div className="mt-[30px]">
        <AudioModal text="Give it a voice" subText="Record or upload 1 min audio of a voice." />
      </div>
    </div>
  )
}
