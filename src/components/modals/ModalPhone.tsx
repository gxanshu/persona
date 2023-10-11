'use client'
import React, { ForwardedRef, forwardRef, useState } from 'react'
import { Icon, ProfileModalCross } from '~/assets/icons'
import AnimatedModal from './AnimatedModal'
import dynamic from 'next/dynamic'
const LazyPhoneModal = dynamic(() => import('./LazyPhoneModal'))
const LazyOnboarding = dynamic(() => import('./onboarding/CarouselOnboard'))

const ModalPhone = forwardRef(({}, ref: ForwardedRef<HTMLDialogElement>) => {
  const [step, setStep] = useState<boolean>(true)

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
    <AnimatedModal ref={ref}>
      <>
        {step
          ? <LazyOnboarding step={() => setStep(false)} />
          : <LazyPhoneModal />}
        <button
          className="h-[40px] w-[40px] flex items-center justify-center bg-[#EBEBEB] rounded-full absolute top-[24px] right-[24px]"
          onClick={closeModal}
        >
          <Icon frameClass="h-[24px] w-[24px]">
            <ProfileModalCross />
          </Icon>
        </button>
      </>
    </AnimatedModal>
  )
})
export default ModalPhone
