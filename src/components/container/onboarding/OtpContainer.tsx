import { Lexend } from 'next/font/google'
import { Dispatch, SetStateAction, useState } from 'react';
import { AuthFlow } from '.';
import OTPInput from '~/components/inputs/OtpInput';
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

const PhoneNumberContainer = (props: { setFlow: Dispatch<SetStateAction<AuthFlow>> })=> {
	const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleOtpSubmit = (otp: string) => {
  	console.log(otp)
  	setLoading(true)
  	setTimeout(()=> {
  		setLoading(false)
  		props.setFlow("name")
  		console.log(otp)
  	}, 1000)
  }

	return (
		<div className='flex flex-col items-center gap-[32px] max-w-[390px]'>
			<div className={`flex flex-col gap-[12px] ${lexend.className}`}>
				<h2 className={`text-[#1D1D1F] text-center text-[33px] sm:text-[21px] font-semibold leading-[-0.42px]`}>Check your phone</h2>
				<div className='flex w-full flex-col items-center justify-center'>
					<p className='text-[#494949] w-[55%] text-[15px] leading-[150%] text-center'>Enter the 6-digit code we’ve texted you.</p>
				</div>
				</div>
				<div className='inline-flex flex-col gap-[24px]'>
					<OTPInput
          handleOtpSubmit={handleOtpSubmit}
          disabled={loading}
          haveError={error as string}
          setError={setError} />
					{/*<div className='inline-flex flex-col gap-[8px]'>
						<button className='text-white text-[15px] leading-[20px] flex items-center justify-center bg-[#187EE7] rounded-[16px] p-[16px]'>
							Continue
						</button>
						<button className='text-[#1D1D1F] text-[15px] leading-[20px] flex items-center justify-center bg-white rounded-[16px] p-[16px]'>
							Discover Persona
						</button>
					</div>*/}
				</div>
		</div>
	)
}

export default PhoneNumberContainer;