'use client';
import { useEffect, useRef } from 'react'
import AudioRecordingOnboarding from '~/components/modals/AudioRecordingOnboarding'

export default function AudioCloning() {
  const modalRef = useRef<HTMLDialogElement>(null);
  

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal()
    }
  }, [])

  return (
    <>
      <AudioRecordingOnboarding ref={modalRef} />
    </>
  )
}