

import React, { useState, useRef, useEffect } from 'react';
import { CrossIcon, SuccessIcon } from '~/assets/icons';
import '~/styles/Input.css';
import ShownError from './ShowError';

export type InputState = '' | 'loading' | 'success' | 'error';

type PreTextInputProps = {
  placeholder: string;
  type?: 'text' | 'email';
  disabled?: boolean;
  value: string;
  setValue: (value: string) => void;
  haveError?: string | null;
  setError: (error: string | null) => void;
  preText: string;
  inputState: InputState;
  setInputState: (state: InputState) => void;
  handleSubmit: (inputValue: string) => void;
};

const PreTextInput: React.FC<PreTextInputProps> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let searchTimeout: NodeJS.Timeout;

  const handleFocus = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.toggle('user-namewrapper_focus');
    }
  };

  useEffect(() => {
    if (props.value != "") {
        props.setInputState('loading');
        props.setError(null);
        if (searchTimeout !== undefined) {
          clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => props.handleSubmit(props.value), 250);
      };
  }, [props.value])

  return (
    <>
      <div
        ref={wrapperRef}
        className="flex w-full rounded-[8px] text-[14px] leading-[20px] bg-[#F7F7F7] p-[12px] border-[2px] border-transparent transition-all duration-75"
      >
        <div className="flex items-center justify-center text-[#6C6C6C]">{props.preText}/</div>
        <input
          ref={inputRef}
          type={props.type}
          data-field={props.type}
          autoCorrect="off"
          autoCapitalize="off"
          aria-required={true}
          required={true}
          spellCheck={false}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          onBlur={handleFocus}
          disabled={props.disabled}
          className="text-ellipsis focus:outline-none disabled:opacity-50 disabled:bg-gray-100 w-full pr-[10px] text-[14px] leading-[20px] text-black bg-[#F7F7F7] ml-[3px]"
          autoComplete="off"
          aria-invalid={false}
          value={props.value}
          onInput={(event) => {
            props.haveError && props.setError(null);
            props.setValue(event.currentTarget.value);
          }}
        />
        <div className="h-[14px] w-[14px]">
          {props.inputState === 'loading' && (
            <div className="h-[14px] w-[14px] bg-blue-600 animate-pulse rounded-full"></div>
          )}
          {props.inputState === 'success' && <SuccessIcon />}
          {props.inputState === 'error' && (
            <button
              onClick={() => {
                props.setValue('');
                props.setError(null);
                props.setInputState('');
              }}
            >
              <CrossIcon />
            </button>
          )}
        </div>
      </div>
      <div className='mt-[10px]'>
        <ShownError error={props.haveError || ''} />
      </div>
    </>
  );
};

export default PreTextInput;
