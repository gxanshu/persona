export default function Footer() {
	const links = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Locations", "Persona Lite", "Threads", "Contact uploading and non-users", "Meta Verfied"]
	return (
		<footer className="flex flex-col px-[16px] relative align-baseline" role="contentinfo">
			<div className="overflow-y-visible content-stretch flex flex-col mb-[52px] items-stretch overflow-x-visible relative text-[12px] leading-[12px] text-[#737373] font-sans">
				<div className="overflow-visible mt-[24px] flex flex-col items-stretch relative">
				{/*links area*/}
				<div className="overflow-visible content-stretch justify-center flex items-stretch flex-wrap ">
					{links.map((link, index) => (
						<ListItem text={link} key={`link-${index}`} />
					))}
				</div>
				</div>
				<div className="overflow-visible my-[12px] justify-center flex gap-[16px] items-stretch relative text-[]">
					{/*meta area*/}
					<p>English (UK)</p>
					<p>© 2023 Persona from Bhuman</p>
				</div>
			</div>
		</footer>
	)
}

const ListItem = ({text, link = "#"}: {text: string, link?: string}) => {
	return (
		<div className="mx-[8px] relative flex overflow-visible items-stretch flex-col mb-[12px]">
			<a href={link} className="no-underline hover:underline">{text}</a>
		</div>
	)
}