import { PanelSearch, Icon } from "~/assets/icons"

export const Search = () => {
	return (
		<div className="inline-flex p-[12px] items-center rounded-[32px] bg-[#F5F5F5]">
			<div className="inline-flex gap-[8px]">
				<Icon frameClass="h-[13px] w-[13px] mt-[2px]" containerClass="h-[20px] w-[20px] inline-flex justify-center"> 
					<PanelSearch/>
				</Icon>
				<input placeholder="Search" type="text" className="placeholder:text-[#86868B] text-[15px] leading-[20px] border-none outline-none bg-[#F5F5F5]"/>
			</div>
		</div>
	)
}