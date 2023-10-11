'use client'
import { useState } from "react"
import PreTextInput, { InputState } from "~/components/inputs/PreTextInput"
import ShownError from "~/components/inputs/ShowError"

export default function SignUpPage() {
	const [value, setValue] = useState<string>('')
  const [error, setError] = useState<null | string>(null)
  const [inputState, setInputState] = useState<InputState>('')
  const [showButton, setShowButton] = useState<boolean | null>(null)

  const handleInputSubmit = (inputValue: string) => {
  	console.log(inputValue)
    if (inputValue == '') {
      setInputState('')
    } else {
      if (inputValue == 'vish') {
        setInputState('success')
      } else {
        setInputState('error')
        setError('This username seems to be taken already... Try something similar.')
      }
    }
  }
	return (
		<div className="flex min-h-screen w-full max-w-[1728px] flex-col p-7 sm:p-16 lg:flex-row">
			<div className="relative flex max-w-[675px] flex-1 flex-col items-center">
				<div className="absolute top-0 flex h-full w-full max-w-[448px] flex-col">
					<div className="absolute inset-0 flex flex-col items-center justify-center"
						style={{opacity: 1, transform: "none"}}
					>
						<div className="flex w-full flex-col">
							<h1 className="font-[700] text-[32px] leading-[40px] ">First, claim your unique link</h1>
							<p className="text-[#6C6C6C] mt-4 font-[20px] leading-[36px] ">The good ones are still available!</p>
							<form>
								<div className="mt-20 mb-4">
									<PreTextInput
				          type="text"
				          placeholder="username"
				          value={value}
				          setValue={setValue}
				          preText="persona.me"
				          haveError={error}
				          setError={setError}
				          inputState={inputState}
				          setInputState={setInputState}
				          handleSubmit={handleInputSubmit}
        				/>
								</div>
								<div className="mt-4 h-[58px] sm:h-[48px]">
									{inputState == 'loading' ? (<button className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
										disabled={true} type="submit">
										<div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
									</button>): (null)}
									{inputState == "error" ? (<ShownError error={String(error)} />): (null)}
									{inputState == "success" ? (<button className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
										disabled={false} type="submit">
										<div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
									</button>) : (null)}
								</div>
							</form>
							<a className="typography-text mt-8 text-[#6C6C6C] text-[12px] leading-[16px]" href="/login">or log in</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


{/*<button className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
										disabled={true} type="submit">
										<div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
									</button>*/}