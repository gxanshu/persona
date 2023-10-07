import React, { useRef } from 'react';
import { Icon, RightArrowIcon } from '~/assets/icons';
import '~/styles/Input.css';
import ShownError from './ShowError';

interface SelectInputProps {
  actionButton?: boolean;
  label: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  haveError?: any;
  className?: string;
  options: string[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  actionButton = false,
  label,
  required,
  name,
  disabled,
  value,
  setValue,
  haveError,
  className,
  options,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLSelectElement | null>(null);

  const handleFocus = () => {
    if (inputRef.current?.value) {
      inputRef.current.classList.toggle('input_focus')
    } else {
      wrapperRef.current?.classList.toggle('wrapper_focus')
      inputRef.current?.classList.toggle('input_focus')
      labelRef.current?.classList.toggle('label_focus')
    }
  };

  return (
    <>
      <div ref={wrapperRef} className={`h-[3.3em] relative m-0 border-transparent ${className}`}>
        <div className="flex items-center relative">
          <select
            ref={inputRef}
            name={name}
            autoCapitalize="off"
            aria-required={required}
            required={required}
            spellCheck="false"
            onFocus={handleFocus}
            onBlur={handleFocus}
            disabled={disabled}
            aria-selected={false}
            className="bg-[#F5F5F5] text-[#494949] rounded-[12px] pt-[1.05882rem] pr-[.94118rem] text-[15px] leading-[20px] h-[3.29412rem] w-full text-ellipsis focus:outline-none custom_padding disabled:opacity-50 disabled:bg-gray-100"
            autoComplete="off"
            aria-invalid="false"
            value={value}
            onChange={(event) => {
              haveError(null);
              setValue(event.target.value);
            }}
          >
            <option value="" selected></option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {actionButton && (
            <button
              type="submit"
              className="translate-x-[-15px] absolute z-[2] right-0 top-[16px] rounded-full bg-[#187FE7] disabled:bg-[#1D1D1F33]"
              disabled={disabled}
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
          className="pr-[26px] text-ellipsis z-[3] text-[#86868b] left-[1rem] duration-[125] ease-in absolute pointer-events-none top-[1.25rem] nowrap overflow-hidden max-w-[calc(100% - 32px)] text-[17px] leading-[14px] text-center will-change-auto transition-all duration-100"
        >
          {label}
        </span>
      </div>
      <ShownError error={haveError() ?? ''} />
    </>
  );
};
