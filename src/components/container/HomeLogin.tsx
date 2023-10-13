import { Lexend_Giga, Lexend } from 'next/font/google'
import { AuthFlow } from './onboarding'
import { Icon, Logo } from '~/assets/icons'

const lexendGiga = Lexend_Giga({ subsets: ['latin'], weight: ['600'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

export default function HomeLogin() {
	return (
		<main className="min-h-screen flex flex-col sm:items-center sm:justify-center w-full sm:p-[84px] gap-[96px] sm:gap-[0px]">
			<div className='sm:hidden p-[24px] flex items-center w-full justify-between'>
				<Icon frameClass='h-[40px] w-[40px]' containerClass='h-[44px] w-[44px] flex items-center justify-center'>
						<Logo/>
				</Icon>
				<div/>
			</div>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-[72px] gap-[48px]">
				<div className='hidden sm:block flex max-w-[650px] max-h-[351px] flex-col justify-center'>
					<h1 className={`text-[96px] font-semibold leading-[110%] tracking-[-15.36px] ${lexendGiga.className} text-[#1D1D1F]`}>
						Your digital clone. Alive forever.
					</h1>
				</div>
				<div className='relative w-full flex gap-[12px] snap-x snap-mandatory overflow-x-auto no-scrollbar sm:hidden'>
					<div className="snap-center shrink-0">
			      <div className="shrink-0 w-4 sm:w-48"></div>
			    </div>
			    <div className='shrink-0 h-[220px] w-[342px] rounded-[24px] bg-[#D9D9D9]'/>
			    <div className='shrink-0 h-[220px] w-[342px] rounded-[24px] bg-[#D9D9D9]'/>
			    <div className="snap-center shrink-0">
			      <div className="shrink-0 w-4 sm:w-48"></div>
			    </div>
				</div>
				<div className="sm:flex sm:flex-col sm:p-[24px] sm:items-center sm:gap-[12px] sm:rounded-[24px] sm:border sm:border-[#EBEBEB] sm:shadow-2xl pl-[24px]">
					<Icon frameClass='h-[40px] w-[40px]' containerClass='hidden sm:block'>
						<Logo/>
					</Icon>
					<div className='sm:min-w-[390px]'>
						<AuthFlow/>
					</div>
				</div>
			</div>
		</main>
	)
}