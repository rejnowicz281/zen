import { getRoom } from "@/actions/rooms";
import Messages from "@/components/messages/Messages";
import Link from "next/link";

export default async function RoomPage({ params: { id } }) {
    const room = await getRoom(id);

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>{room.name}</h1>
            {room.admin && <p>admin: {room.admin.email}</p>}
            <Messages messages={room.messages} roomId={id} />
        </div>
    );
}
