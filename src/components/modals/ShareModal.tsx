'use client'
import { FC, ForwardedRef, forwardRef, ReactNode, useRef, useState } from 'react'
import {
  ShareEmail,
  ShareEmbid,
  ShareFacebookIcon,
  ShareRedit,
  ShareTwitterIcon,
  ShareWhatsapp,
} from '~/assets/icons/ShareModalIcons'
import AnimatedModal from './AnimatedModal'

interface AnimatedModalProps {}

const ShareModal = forwardRef(
  ({}: AnimatedModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLParagraphElement>(null)
    const [scrolled, setScrolled] = useState(false)

    const handleSrolling = () => {
      let a = containerRef.current?.scrollLeft as number
      let totalComplete = Math.floor((a / 287) * 100)
      if (totalComplete > 5) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    const scrollContainer = (value: number) => {
      let container = containerRef.current
      if (container) {
        container.scrollLeft = value
      }
    }

    const copyContent = async () => {
      if (contentRef.current) {
        const text = contentRef.current.innerText
        try {
          await navigator.clipboard.writeText(text)
          console.log('Content copied to clipboard')
        } catch (err) {
          console.error('Failed to copy: ', err)
        }
      }
    }

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
      <AnimatedModal
        ref={ref}
        containerClass="w-[663px] bg-white rounded-2xl p-[22px]"
        style={{ minHeight: 346 }}
      >
        <div className="flex items-center flex-col justify-center w-full h-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-[20px] leading-[24px] text-[#0F0F0F] font-[500]">Share</p>
            <button onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.1352 0.864853L1.21631 18.7838" stroke="#030303" strokeWidth="1.49324" />
                <path d="M19.1353 18.7838L1.21633 0.864852" stroke="#030303" strokeWidth="1.49324" />
              </svg>
            </button>
          </div>
          <div className="relative mt-[20px]">
            <div
              onScroll={handleSrolling}
              ref={containerRef}
              className="flex items-center gap-[22px] max-w-[600px] overflow-x-auto scroll-smooth no-scrollbar"
            >
              <ShareCard
                icon={<ShareEmbid />}
                text="Embed"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareWhatsapp />}
                text="Whatsapp"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareFacebookIcon />}
                text="Facebook"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareTwitterIcon />}
                text="Twitter"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareEmail />}
                text="Email"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareRedit />}
                text="Reddit"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareRedit />}
                text="Reddit"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareRedit />}
                text="Reddit"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
              <ShareCard
                icon={<ShareRedit />}
                text="Reddit"
                link={`https://twitter.com/intent/tweet?text=Hello%20world`}
              />
            </div>
            {!scrolled && (
              <button
                onClick={() => scrollContainer(287)}
                className="w-[53.76px] h-[53.76px] right-0 top-5 absolute bg-white rounded-full shadow"
              />
            )}
            {scrolled && (
              <button
                onClick={() => scrollContainer(0)}
                className="w-[53.76px] h-[53.76px] left-0 top-5 absolute bg-white rounded-full shadow"
              />
            )}
          </div>
          <div className="mt-[40px] w-full h-[64px] rounded-[14px] border border-[#E0E0E0] bg-[#F9F9F9] p-[12px] flex items-center justify-between">
            <p ref={contentRef} className="text-[#0F0F0F] text-[18px] leading-[24px]">
              https://youtu.be/TGxKkBC6L2k
            </p>
            <button
              className="text-white text-[18px] leading-[24px] font-[500] w-[78px] h-[44px] bg-[#2EA7E0] rounded-[24px]"
              onClick={copyContent}
            >
              Copy
            </button>
          </div>
        </div>
      </AnimatedModal>
    )
  },
)

interface ShareCardProps {
  icon: ReactNode
  text: string
  link: string
}

const ShareCard = (props: ShareCardProps) => {
  return (
    <a href={props.link} className="cursor-pointer" target="_blank">
      <div className="flex flex-col items-center gap-[12px]">
        {props.icon}
        <p className="text-[14px] leading-[20px] text-[#0F0F0F]">{props.text}</p>
      </div>
    </a>
  )
}

export default ShareModal
