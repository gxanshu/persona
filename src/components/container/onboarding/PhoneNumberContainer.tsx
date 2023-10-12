import { Lexend } from 'next/font/google'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NumberInput from '~/components/inputs/NumberInput';
import { AuthFlow } from '.';
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

const PhoneNumberContainer = (props: { setFlow: Dispatch<SetStateAction<AuthFlow>> })=> {
	const [value, setValue] = useState<string>('')
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

	useEffect(() => {
    if (value.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [value])

	return (
		<div className='flex flex-col gap-[32px] max-w-[390px]'>
			<div className={`flex flex-col gap-[12px] ${lexend.className}`}>
				<h2 className={`text-[#1D1D1F] text-[33px] font-semibold tracking-[-0.66px]`}>Get your Persona</h2>
				<p className='text-[#494949] text-[15px] leading-[20px] '>The most advanced clone of yourself. It’s Free.</p>
				</div>
				<div className='inline-flex flex-col gap-[24px]'>
					<form onSubmit={(e) =>  {
						e.preventDefault()
						props.setFlow('otp')
					}}>
						<NumberInput
							label="Phone number"
							value={value}
							setValue={setValue}
							handleSubmit={()=> props.setFlow("otp")}
							buttonDisabled={buttonDisabled} />
					</form>
					<div className='inline-flex flex-col gap-[8px]'>
						<button onClick={()=> props.setFlow('otp')} className='text-white text-[15px] leading-[20px] flex items-center justify-center bg-[#187EE7] rounded-[16px] p-[16px]'>
							Continue
						</button>
						<button className='text-[#1D1D1F] text-[15px] leading-[20px] flex items-center justify-center bg-white rounded-[16px] p-[16px]'>
							Discover Persona
						</button>
					</div>
				</div>
		</div>
	)
}

export default PhoneNumberContainer;