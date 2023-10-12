'use client'
import dynamic from "next/dynamic"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PreTextInput, { InputState } from "~/components/inputs/PreTextInput"
import ShownError from "~/components/inputs/ShowError"
const PhoneSection = dynamic(()=> import("./onboarding/PhoneSection"))

export type authFlow = "link" | "phone" | "otp" | "name"

export default function SignUpPage() {
  const [flow, setFlow] = useState<authFlow>("link")

	return (
		<div className="flex min-h-screen w-full max-w-[1728px] flex-col p-7 sm:p-16 lg:flex-row">
			<div className="relative flex max-w-[675px] flex-1 flex-col items-center">
				<div className="absolute top-0 flex h-full w-full max-w-[448px] flex-col">
					<div className="absolute inset-0 flex flex-col items-center justify-center"
						style={{opacity: 1, transform: "none"}}
					>
						{flow == "link" && <LinkSection setFlow={setFlow}/>}
						{flow == "phone" && <PhoneSection setFlow={setFlow}/>}
					</div>
				</div>
			</div>
		</div>
	)
}

const LinkSection = (props: {setFlow: Dispatch<SetStateAction<authFlow>>}) => {
	const [value, setValue] = useState<string>('')
	const [inputState, setInputState] = useState<InputState>(null);

	async function delayAndReturnTrue() {
	  return new Promise((resolve) => {
	    setTimeout(() => {
	      if(value === "vish") {
	      	resolve(true);
	      } else {
	      	resolve(false);
	      }
	    }, 3000);
	  });
	}

	useEffect(() => {
    const delayDebounceFn = setTimeout(async() => {
      if(value !== ""){
      	console.log(value)
			setInputState('loading')
			const result = await delayAndReturnTrue();
			if(result){
				setInputState('success')
			} else {
				setInputState("error")
			}
      }
    }, 150)

    return () => clearTimeout(delayDebounceFn)
  }, [value])

	return (
		<div className="flex w-full flex-col">
							<h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">Let’s make your clone</h1>
							<p className="text-[#494949] mt-[16px] font-[17px] leading-[24px] ">The good ones are still available!</p>
								<div>
									<div className="mt-20 mb-4">
									<PreTextInput
				          type="text"
				          placeholder="username"
				          value={value}
				          setValue={setValue}
				          preText="persona.me"
				          inputState={inputState}
				          setInputState={setInputState}
        				/>
								</div>
								<div className="mt-4 h-[58px] sm:h-[48px]">
									{inputState == 'loading' ? (<button className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
										disabled={true} type="submit">
										<div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
									</button>): (null)}
									{inputState == "error" ? (<ShownError error={"This username seems to be taken already... Try something similar."} />): (null)}
									{inputState == "success" ? (<button className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
										disabled={false} type="submit">
										<div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
									</button>) : (null)}
								</div>
								</div>
							<a className="typography-text mt-8 text-[#6C6C6C] text-[12px] leading-[16px]" href="/login">or log in</a>
						</div>
	)
}