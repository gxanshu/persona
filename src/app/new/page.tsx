import { ChatHeader } from "~/components/chatpanel/ChatHeader";
import { MsgContainer } from "~/components/chatpanel/MsgContainer";
import { Search } from "~/components/chatpanel/Search";

export default function TestingPage() {
	return (
		<div className="p-[72px]">
			<div className="flex flex-col border-r max-w-max">
			<div className="p-[12px]">
				<ChatHeader/>
			</div>
			<div className="p-[12px] border-b">
				<Search/>
			</div>
			<div className="inline-flex flex-col gap-[2px] max-h-[450px] max-w-max overflow-x-hidden overflow-y-auto p-[4px] no-scrollbar">
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
		</div>
	)
}