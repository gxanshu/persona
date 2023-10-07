import { ChatHeader } from "~/components/chatpanel/ChatHeader";
import { MsgContainer } from "~/components/chatpanel/MsgContainer";
import { Search } from "~/components/chatpanel/Search";

export default function TestingPage() {
	return (
		<div className="p-[72px] flex flex-col gap-[24px] max-w-max">
			<ChatHeader/>
			<Search/>
			<MsgContainer/>
		</div>
	)
}