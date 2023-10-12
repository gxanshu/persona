import { Lexend_Giga, Lexend } from 'next/font/google'
import { AuthFlow } from './onboarding'
import { Icon, Logo } from '~/assets/icons'

const lexendGiga = Lexend_Giga({ subsets: ['latin'], weight: ['600'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

export default function HomeLogin() {
	return (
		<main className="min-h-screen w-full p-[84px]">
			<div className="flex items-center justify-center gap-[72px]">
				<div className='flex max-w-[650px] max-h-[351px] flex-col justify-center'>
					<h1 className={`text-[96px] font-semibold leading-[110%] tracking-[-15.36px] ${lexendGiga.className} text-[#1D1D1F]`}>
						Your digital clone. Alive forever.
					</h1>
				</div>
				<div className="flex flex-col p-[24px] items-center gap-[12px] rounded-[24px] border border-[#EBEBEB]" style={{boxShadow: "0px 2px 48px 0px rgba(29, 29, 31, 0.12)"}}>
					<Icon frameClass='h-[40px] w-[40px]'>
						<Logo/>
					</Icon>
					<div className='min-w-[390px]'>
						<AuthFlow/>
					</div>
				</div>
			</div>
		</main>
	)
}