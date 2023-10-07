import { MsgContainer } from "~/components/chatpanel/MsgContainer";
import { Search } from "~/components/chatpanel/Search";

export default function TestingPage() {
	return (
		<div className="p-[72px] flex flex-col gap-[24px] max-w-max">
			<MsgContainer/>
			<Search/>
		</div>
	)
}