'use client'
import { ForwardedRef, forwardRef, useState } from 'react'
import AnimatedModal from './AnimatedModal'
import dynamic from 'next/dynamic'
const LazyOnboarding = dynamic(() => import('./onboarding/ListOnboard'))
const AudioContainer = dynamic(()=> import("~/components/audio-recorder"), {
  loading: () => <div className='h-[644px]'/>
})

const AudioRecordingOnboarding = forwardRef(({}, ref: ForwardedRef<HTMLDialogElement>) => {

  const [step, setStep] = useState(true);

  const closeModal = () => {
    if (ref) {
      // @ts-ignore
      ref.current.classList.add('modal-exit')
      // @ts-ignore
      ref.current.addEventListener('animationend', function() {
        // @ts-ignore
        ref.current.classList.remove('modal-exit')
        // @ts-ignore
        ref.current.close()
      }, { once: true })
    }
  }

  return (
    <AnimatedModal containerClass='min-h-screen sm:min-h-[644px] recording-modal flex items-center justify-center sm:block' ref={ref}>
    {step
          ? <div className='h-[644px]'>
            <LazyOnboarding step={() => setStep(false)} />
          </div>
          : <AudioContainer />}
    </AnimatedModal>
  )
})
export default AudioRecordingOnboarding
