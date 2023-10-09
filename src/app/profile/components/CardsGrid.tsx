'use client'
import { ProfileBrain, ProfileBusiness, ProfileFace, ProfileMobile, ProfileVoice } from "~/assets/icons"
import { Card } from "./Cards"
import { AboutCard } from "."
import { useState } from "react"
import dynamic from "next/dynamic"
const ModalAudio = dynamic(() => import('~/components/modals/AudioRecordingModal'))
const ModalPhone = dynamic(() => import('~/components/modals/ModalPhone'))

export const CardsGrid = () => {
  const [modal, setModal] = useState({
    voice: false,
    number: false,
  })
	return (
    <>
        <ModalAudio show={modal.voice} onClose={() => setModal(prevValue => ({ ...prevValue, voice: false }))} />
      <ModalPhone show={modal.number} onClose={() => setModal(prevValue => ({ ...prevValue, number: false }))}/>
      </>
	)
}