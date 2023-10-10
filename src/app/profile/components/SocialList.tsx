'use client'

import { FC, ReactNode, useState } from 'react'
import { animate } from '~/lib'

interface SocialListProps {
  icon: ReactNode
  delay: number
}

export const SocialList: FC<SocialListProps> = ({ icon, delay }) => {
  const [username, setUsername] = useState('')
  const [hover, setHover] = useState(false)

  const handlePaste = async () => {
    let clipboard = await navigator.clipboard.readText()
    setUsername(clipboard)
  }

  return (
    <div className="flex gap-[8px]" style={{ ...animate({ name: 'fadeIn', delay }), opacity: 0 }}>
      <div className="rounded-sm">
        {icon}
      </div>
      <div
        className="h-[44px] bg-gray-100 rounded-xl w-full flex items-center gap-[4px]"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p className="ml-2">@</p>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="outline-none border-none w-full bg-gray-100"
        />
        <button
          className={`text-sm antialiased break-words font-semibold select-none outline-solid outline-offset-2 transform hover:scale-105 bg-white text-black p-1.5 rounded-lg shadow-md mr-2 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
          type="button"
          onClick={handlePaste}
        >
          <div className="flex items-center justify-center">
            <div className="text-sm">Paste</div>
          </div>
        </button>
      </div>
    </div>
  )
}
