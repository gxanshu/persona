import { FC, useState } from "react"
import ShownError from "./ShowError"

interface Props {
  handleOtpSubmit: (otp: string) => void
  disabled: boolean
  haveError: string
  setError: (value: string | null) => void
}

const OTPInput:FC<Props> = ({handleOtpSubmit, disabled, haveError, setError}) => {
  const PIN_LENGTH = 6
  const [pin, setPin] = useState<Array<string | null>>(
    new Array(PIN_LENGTH).fill(null),
  )
  const onSubmit = async () => {
    const code = pin.join('')
    handleOtpSubmit(code)
  }
  const onInput = (e: string, idx: number) => {
    if (isNaN(parseInt(e))) {
      return
    }
    setError(null)
    const upperIdx = idx + 1
    setPin(prev => {
      const asArr = prev.slice()
      asArr[idx] = e
      return asArr
    })
    const nextEmpty = pin
      .slice(upperIdx)
      .findIndex(e => !e)
    if (upperIdx !== PIN_LENGTH && nextEmpty !== -1) {
      document.getElementById(`pin-${upperIdx}`)?.focus()
    } else {
      document.getElementById(`pin-${idx}`)?.blur()
      onSubmit()
    }
  }

  return (
    <>
      <form
        id="otp"
        onPaste={e => {
          if (disabled) {
            return
          }
          const text = e.clipboardData?.getData('text')
          if (text) {
            const cop = text.trim().split('')
            for (const [idx, char] of cop.entries()) {
              onInput(char, idx)
            }
          }
        }}
        className="flex text-center gap-[.5rem]"
        onSubmit={() => console.log('formdata')}
      >
        {Array(PIN_LENGTH).fill(null).map((_, index) => (
          <input
            id={`pin-${index}`}
            maxLength={1}
            inputMode="decimal"
            autoFocus={index === 0}
            min={0}
            max={9}
            className="border h-[52px] w-[52px] text-center bg-[#F2F2F2] focus:border-[#0071e3] outline-none focus_shadow font-[700] text-[1.25rem] leading-[20px] p-[2px] rounded-[.5rem] disabled:opacity-50 disabled:bg-gray-100"
            value={pin[index] ?? ''}
            onInput={(e) => {
              e.preventDefault();
              const updatedPin = [...pin];
              updatedPin[index] = e.currentTarget.value;
              for (const [i, v] of updatedPin.entries()) {
                if (v !== '' && isNaN(parseInt(v as string))) {
                  updatedPin[i] = '';
                }
              }
              e.currentTarget.value = updatedPin[index] as string;
              setError('');
              onInput(e.currentTarget.value, index);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                if (index === 0) {
                  e.preventDefault();
                  const updatedPin = new Array(PIN_LENGTH).fill(null);
                  setPin(updatedPin);
                  document.getElementById(`pin-0`)?.focus();
                } else {
                  const updatedPin = [...pin];
                  const ele = updatedPin[index];
                  if (!ele) {
                    e.preventDefault();
                    document.getElementById(`pin-${index - 1}`)?.focus();
                  } else {
                    updatedPin[index] = null;
                    setPin(updatedPin);
                  }
                }
              }
            }}
            disabled={disabled}
          />
        ))}
      </form>
      <ShownError error={haveError ?? ''} />
    </>
  )
}

export default OTPInput