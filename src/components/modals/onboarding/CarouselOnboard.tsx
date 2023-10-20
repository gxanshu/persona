'use client'
import { useState } from 'react'

interface Props {
  step: () => void
}

const ModalStartImage: React.FC<Props> = props => {
  const [activeIndex, setActiveIndex] = useState(0)
  // copied from: https://github.com/harakisgeorge/carouselreact/blob/master/src/Carousel.jsx
  const items = [1, 2, 3]
  const itemWidth = 400

  const updateIndex = (newIndex: number) => {
    console.log(newIndex)
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1
    }

    setActiveIndex(newIndex)
  }

  return (
    <div className="flex flex-col items-center justify-between pt-[74px] gap-[48px] w-full no-s">
      <div className="max-w-[400px] flex overflow-hidden">
        <div
          className="min-w-[400px] h-[300px] flex items-center justify-center transition-transform"
          style={{ transform: `translateX(-${activeIndex * itemWidth}px)` }}
        >
          <div className="bg-gray-50 h-[184px] w-[184px] rounded-xl" />
        </div>
        <div
          className="min-w-[400px] h-[350px] flex items-center justify-center transition-transform"
          style={{ transform: `translateX(-${activeIndex * itemWidth}px)` }}
        >
          <div className="bg-gray-50 h-[184px] w-[350px] rounded-xl" />
        </div>
        <div
          className="min-w-[400px] h-[350px] flex items-center justify-center transition-transform"
          style={{ transform: `translateX(-${activeIndex * itemWidth}px)` }}
        >
          <div className="bg-gray-50 h-[300px] w-[350px] rounded-xl" />
        </div>
      </div>
      <div className="flex gap-[10px] justify-around items-center mt-[-40px]">
        {items.map((item, index) => {
          return (
            <button
              className={`border-none h-[10px] w-[10px] rounded-full ${
                index == activeIndex ? 'bg-gray-900' : 'bg-gray-500'
              }`}
              onClick={() => {
                updateIndex(index)
              }}
              key={`index-${index}`}
            >
            </button>
          )
        })}
      </div>
      <div className="px-[64px] pb-[64px] w-full">
        <button
          onClick={() => props.step()}
          className="p-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[15px] leading-[20px] font-[500] bg-[#F2F2F2] w-full"
        >
          I'm sure
        </button>
      </div>
    </div>
  )
}

export default ModalStartImage
