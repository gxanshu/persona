'use client';
import { useRef, useState } from 'react';
import { SocialList } from './SocialList'
import { GithubIcon, InstagramIcon, LinkdinIcon, TwitterIcon } from '~/assets/icons'
export const SocialCardList = () => {
	const [topHeight, setTopHeight] = useState<number>(0)
	const [bottomHeight, setBottomHeight] = useState<number>(72)
	const containerRef = useRef<HTMLDivElement>(null)

	const handleSrolling = () => {
		let a = containerRef.current?.scrollTop as number
		let totalComplete = Math.floor((a/298)*100);
		let topHeightTobe = Math.floor((totalComplete/100)*72)
		let bottomHeightTobe = Math.floor((totalComplete/100)*72)
		// Calculate bottomHeight (opposite direction)
  let bottomHeightToBe = 72 - topHeightTobe;
  setBottomHeight(bottomHeightToBe);
	setTopHeight(topHeightTobe)
	}
	return (
		<div className='relative flex max-h-[250px] flex-1 flex-col'>
          <div className="flex flex-1 flex-col overflow-y-auto gap-3 no-scrollbar"
            onScroll={handleSrolling} ref={containerRef} >
            <SocialList icon={<TwitterIcon/>} delay={0.2} />
            <SocialList icon={<InstagramIcon/>} delay={0.4}/>
            <SocialList icon={<GithubIcon/>} delay={0.6}/>
            <SocialList icon={<LinkdinIcon/>} delay={0.8}/>
            <SocialList icon={<TwitterIcon/>} delay={1}/>
            <SocialList icon={<TwitterIcon/>} delay={1.2}/>
            <SocialList icon={<TwitterIcon/>} delay={1.4}/>
            <SocialList icon={<TwitterIcon/>} delay={1.6}/>
            <SocialList icon={<TwitterIcon/>} delay={1.8}/>
            <SocialList icon={<TwitterIcon/>} delay={2}/>
          </div>
          <div className={`h-[30px] pointer-events-none absolute left-[-0.25rem] right-[-0.25rem] top-[-2px] bg-[linear-gradient(180deg,#fff,hsla(0,0%,100%,0))]`}
          style={{height: topHeight}}
          ></div>
          <div className={`h-[42px] pointer-events-none absolute left-[-0.25rem] right-[-0.25rem] bottom-[-2px] bg-[linear-gradient(180deg,hsla(0,0%,100%,0),#fff)] transition-opacity`}
          style={{height: bottomHeight}}
          ></div>
      </div>
	)
}