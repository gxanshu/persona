'use client'
import { useState } from 'react'

const LazyPhoneModal = () => {
  const [inputNumber, setInputNumber] = useState<string>('')
  const [selectList, setSelectList] = useState<number | null>(null)
  return (
    <div className="w-full h-full flex flex-col justify-center relative pb-[64px]">
      <div className="inline-flex flex-col items-center gap-[48px] px-[64px] pt-[64px]">
        <div className="flex flex-col items-center gap-[16px]">
          <h2 className="text-[33px] leading-[40px] font-[600]">New Phone Number</h2>
          <p className="text-[15px] leading-[150%] text-[#494949] text-center max-w-[258px]">
            Your followers will text here. Your persona AI responds
          </p>
        </div>
        <div className="min-w-[300px]">
          <div className="flex p-[16px] items-center gap-[12px] rounded-[32px] bg-[#F5F5F5] w-full">
            <input
              type="text"
              className="w-full placeholder:text-[#86868B] text-[17px] leading-[24px] bg-[#F5F5F5] outline-none no-controller"
              placeholder="Search"
              value={inputNumber}
              onChange={event => setInputNumber(event.target.value)}
            />
          </div>
        </div>
      </div>
      {inputNumber !== '' && (
        <div className="w-full my-[24px]">
          <div className="flex items-start gap-[16px] w-full mt-[12px] snap-x snap-mandatory overflow-x-auto no-scrollbar">
            <div className="snap-center shrink-0">
              <div className="shrink-0 w-4 sm:w-[100px]"></div>
            </div>
            <div className="min-w-max grid grid-row-3 grid-cols-3 gap-x-[10px] gap-y-[12px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center py-[12px] px-[16px] rounded-[12px] border border-[2px] bg-white cursor-pointer ${
                    selectList === index ? 'border-black' : ''
                  }`}
                  onClick={() => setSelectList(index)}
                >
                  <p className="min-w-[151px] text-[#1D1D1F] text-[15px] leading-[20px] text-center">
                    +1 983-556-4321
                  </p>
                </div>
              ))}
            </div>
            <div className="snap-center shrink-0">
              <div className="shrink-0 w-4 sm:w-[100px]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyPhoneModal
