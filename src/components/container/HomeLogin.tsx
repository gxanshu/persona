import { Lexend_Giga, Lexend } from 'next/font/google'
import { AuthFlow } from './onboarding'

const lexendGiga = Lexend_Giga({ subsets: ['latin'], weight: ['600'] })
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

export default function HomeLogin() {
	return (
		<main className="min-h-screen w-full p-[84px]">
			<div className="flex items-center justify-center gap-[72px]">
				<div className='h-[450px] w-[450px] bg-gray-50'>
					{/*here the cool logo will apper*/}
				</div>
				<div className="inline-flex items-start flex-col gap-[88px]">
					<h1
						className={`${lexendGiga.className} font-semibold text-[64px] leading-[110%] tracking-[-10.24px]`}>Clone yourself.
					</h1>
					<AuthFlow/>
				</div>
			</div>
		</main>
	)
}