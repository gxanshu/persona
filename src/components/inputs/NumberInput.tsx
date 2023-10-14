import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import 'intl-tel-input/build/css/intlTelInput.css'
import intlTelInput from 'intl-tel-input'
import '~/styles/Input.css'
import { Icon, RightArrowIcon } from '~/assets/icons'

interface NumberInputProps {
  actionButton?: boolean
  label: string
  required?: boolean
  handleSubmit?: () => void
  buttonDisabled?: boolean
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const NumberInput: React.FC<NumberInputProps> = (
  { actionButton, label, required, buttonDisabled, handleSubmit, value, setValue },
) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const [init, setinit] = useState(false)

  const handleFocus = () => {
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.classList.toggle('input_focus')
    } else if (wrapperRef.current && labelRef.current) {
      wrapperRef.current.classList.toggle('wrapper_focus')
      if (inputRef.current) inputRef.current.classList.toggle('input_focus')
      labelRef.current.classList.toggle('label_focus')
    }
  }

  useEffect(() => {
    if (!inputRef.current) return
    const iti = intlTelInput(inputRef.current, {
      separateDialCode: false,
      initialCountry: 'auto',
      geoIpLookup: callback => {
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(data => callback(data.country_code))
          .catch(() => callback('us'))
      },
    })
    iti.promise.then(() => {
      setinit(true)
    })
  }, [])

  useEffect(() => {
    if (value != '' && !labelRef.current?.classList.contains('label_focus')) {
      labelRef.current?.classList.add('label_focus')
    }
  }, [value])

  return (
    <div ref={wrapperRef} className="h-[3.3em] w-full relative m-[0px] rounded-[6px] border-transparent">
      <div className="flex items-center relative">
        {init === false && (
          <div className="w-[46px] h-full absolute flex items-center justify-center">
            <div className="w-[30px] h-[16px] bg-[#dbdbdb] rounded-sm" />
          </div>
        )}
        <input
          ref={inputRef}
          type="number"
          can-field="number"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-required={true}
          required={required || false}
          spellCheck={false}
          onFocus={handleFocus}
          onBlur={handleFocus}
          value={value}
          disabled={!init}
          onInput={e => setValue(e.currentTarget.value)}
          className="pr-[43px] pl-[52px] pt-[16px] bg-[hsla(0,0%,100%,.8)] border-[#d2d2d7] text-[#494949] border border-[#d2d2d7] rounded-[12px] text-[15px] leading-[20px] h-[3.29412rem] w-full text-ellipsis focus:outline-none no-controller"
          aria-invalid={false}
        />
        {actionButton && (
          <button
            type="submit"
            className="translate-x-[-15px] absolute z-[2] right-0 top-[16px] rounded-full bg-[#187FE7] disabled:bg-[#1D1D1F33]"
            disabled={buttonDisabled}
            onClick={handleSubmit}
          >
            <Icon containerClass="" frameClass="h-[24px] w-[24px] flex p-[4px] items-center gap-[12px]">
              <RightArrowIcon />
            </Icon>
          </button>
        )}
      </div>
      <span
        aria-hidden={true}
        ref={labelRef}
        className="pr-[26px] pl-[52px] text-ellipsis z-[3] text-[#86868b] duration-[125] ease-in absolute pointer-events-none top-[1.05882rem] nowrap overflow-hidden max-w-[calc(100% - 32px)] text-[15px] leading-[20px] text-center will-change-auto transition-all duration-100"
      >
        {label}
      </span>
    </div>
  )
}

export default NumberInput
