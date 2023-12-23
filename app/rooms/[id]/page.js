import { getRoom } from "@/actions/rooms";
import CreateMessage from "@/components/messages/CreateMessage";
import Messages from "@/components/messages/Messages";
import MembersList from "@/components/rooms/MembersList";
import MembershipButton from "@/components/rooms/MembershipButton";
import Link from "next/link";

export default async function RoomPage({ params: { id } }) {
    const room = await getRoom(id);

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>{room.name}</h1>
            {room.admin && <p>admin: {room.admin.email}</p>}
            <MembersList members={room.members} />
            {!room.isAdmin && <MembershipButton isMember={room.isMember} roomId={id} />}
            <Messages messages={room.messages} roomId={id} />
            {(room.isAdmin || room.isMember) && <CreateMessage roomId={id} />}
        </div>
    );
}
