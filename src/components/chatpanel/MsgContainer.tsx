import { Icon } from "~/assets/icons"
import { CheckIcon } from "~/assets/icons/PanelIcons"

export const MsgContainer = () => {
	return (
		<div className="inline-flex p-[8px] items-center rounded-[12px] bg-[#F5F5F5]">
			<div className="inline-flex gap-[8px]">
				<span className="h-[56px] w-[56px] bg-[#86868B] rounded-full"/>
				<div className="inline-flex flex-col gap-[4px]">
					<div className="flex items-center gap-[8px] justify-between">
						<p className="text-[#1D1D1F] text-[15px] font-[500] leading-[20px]">Vish</p>
						<div className="inline-flex gap-[2px]">
							<Icon frameClass="h-[16px] w-[16px]">
								<CheckIcon/>
							</Icon>
							<p className="text-[#494949] text-right text-[12px] leading-[20px]">Thu</p>
						</div>
					</div>
					<div className="flex items-center gap-[8px]">
						<p className="text-[#494949] text-[13px] leading-[20px] max-w-[208px] text-wrap">This is a new message with multi line support, with ellipsis support and here we go</p>
						<span className="w-[8px] h-[8px] bg-[#0095F6] rounded-full"/>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	)
}