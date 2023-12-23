import { getPublicMessages } from "@/actions/messages";
import Messages from "@/components/messages/Messages";
import Link from "next/link";

export default async function PublicRoomPage() {
    const messages = await getPublicMessages();

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>Public Room</h1>
            <Messages messages={messages} />
        </div>
    );
}
