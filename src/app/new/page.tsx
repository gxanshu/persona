import { ChatHeader } from "~/components/chatpanel/ChatHeader";
import { MsgContainer } from "~/components/chatpanel/MsgContainer";
import { Search } from "~/components/chatpanel/Search";

export default function TestingPage() {
	return (
		<div className="p-[72px] flex flex-col gap-[24px] max-w-max">
			<ChatHeader/>
			<Search/>
			<div className="inline-flex flex-col gap-[2px] max-h-[450px] max-w-max overflow-x-hidden overflow-y-auto p-[4px]">
				<MsgContainer msg="This is a new message with multi line support, with ellipsis support and here we go"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
				<MsgContainer msg="This is a new message with 1 line"/>
			</div>
		</div>
	)
}