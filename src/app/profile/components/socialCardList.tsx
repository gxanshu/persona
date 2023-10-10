'use client';
import { useState } from 'react';
import { SocialList } from './SocialList'
import { GithubIcon, InstagramIcon, LinkdinIcon, TwitterIcon } from '~/assets/icons'
export const SocialCardList = () => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false)
	let timer:NodeJS.Timeout;

	const handleSrolling = () => {
	if(timer !== null) {
	        clearTimeout(timer);    
	    }
	    setIsScrolling(true)
	    timer = setTimeout(function() {
	          setIsScrolling(false)
	    }, 100);
	}

	return (
		<div className='relative flex max-h-[250px] flex-1 flex-col'>
          <div className="flex flex-1 flex-col overflow-y-auto gap-3 no-scrollbar"
            onScroll={handleSrolling} >
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
          <div className={`h-[30px] pointer-events-none absolute left-[-0.25rem] right-[-0.25rem] top-[-2px] bg-[linear-gradient(180deg,#fff,hsla(0,0%,100%,0))] ${isScrolling ? "opacity-100": "opacity-0"} transition-opacity`}></div>
          <div className={`h-[42px] pointer-events-none absolute left-[-0.25rem] right-[-0.25rem] bottom-[-2px] bg-[linear-gradient(180deg,hsla(0,0%,100%,0),#fff)] transition-opacity ${isScrolling ? "opacity-100": "opacity-0"}`}></div>
      </div>
	)
}