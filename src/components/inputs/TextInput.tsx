import React, { useEffect, useRef } from 'react'
import { Icon, RightArrowIcon } from '~/assets/icons'
import '~/styles/Input.css'
import ShownError from './ShowError'

interface TextInputProps {
  actionButton?: boolean
  label: string
  type?: 'text' | 'email'
  required?: boolean
  name: string
  disabled?: boolean
  buttonDisabled?: boolean
  value: string
  setValue: (value: string) => void
  haveError?: any
  className?: string
  handleSubmit?: () => void
  autoFocus?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
  actionButton = false,
  label,
  type = 'text',
  required,
  name,
  disabled,
  value,
  setValue,
  haveError,
  className,
  buttonDisabled,
  handleSubmit,
  autoFocus
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFocus = () => {
    if (inputRef.current?.value) {
      inputRef.current.classList.toggle('input_focus')
    } else {
      wrapperRef.current?.classList.toggle('wrapper_focus')
      inputRef.current?.classList.toggle('input_focus')
      labelRef.current?.classList.toggle('label_focus')
    }
  }

  useEffect(()=> {
    if(value != "" && !labelRef.current?.classList.contains("label_focus")){
      labelRef.current?.classList.add("label_focus")
    }
  }, [value])

  useEffect(()=> {
    if(autoFocus){
      wrapperRef.current?.classList.add('wrapper_focus')
      inputRef.current?.classList.add('input_focus')
      labelRef.current?.classList.add('label_focus')
    }
  }, [autoFocus])

  return (
    <>
      <div ref={wrapperRef} className={`h-[3.3em] relative m-0 border-transparent ${className}`}>
        <div className="flex items-center relative">
          <input
            ref={inputRef}
            type={type}
            name={name}
            autoCorrect="off"
            autoCapitalize="off"
            aria-required={required}
            required={required}
            spellCheck="false"
            onFocus={handleFocus}
            onBlur={handleFocus}
            disabled={disabled}
            autoFocus={autoFocus}
            className="bg-[#F5F5F5] text-[#494949] rounded-[12px] pt-[1.05882rem] pr-[.94118rem] text-[15px] leading-[20px] h-[3.29412rem] w-full text-ellipsis focus:outline-none custom_padding disabled:opacity-50 disabled:bg-gray-100"
            autoComplete="off"
            aria-invalid="false"
            value={value}
            onChange={event => {
              haveError(null)
              setValue(event.target.value)
            }}
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
          aria-hidden="true"
          ref={labelRef}
          id="apple_id_field_label"
          className="pr-[26px] text-ellipsis z-[3] text-[#86868b] left-[1rem] duration-[125] ease-in absolute pointer-events-none top-[1rem] nowrap overflow-hidden max-w-[calc(100% - 32px)] text-[15px] leading-[20px] text-center will-change-auto transition-all duration-100"
        >
          {label}
        </span>
      </div>
      <ShownError error={haveError() ?? ''} />
    </>
  )
}
