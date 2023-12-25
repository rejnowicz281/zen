import { getRoom } from "@/actions/rooms";
import CreateMessage from "@/components/messages/CreateMessage";
import Messages from "@/components/messages/Messages";
import JoinRequests from "@/components/rooms/JoinRequests";
import MembersList from "@/components/rooms/MembersList";
import MembershipButton from "@/components/rooms/MembershipButton";
import Link from "next/link";

export default async function RoomPage({ params: { id } }) {
    const room = await getRoom(id);

    const isAuthorized = room.public || room.isAccepted || room.isAdmin;

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>{room.name}</h1>
            {room.admin && (
                <p>
                    admin: <Link href={`/users/${room.admin.id}`}> {room.admin.email} </Link>
                </p>
            )}
            {!room.public && <p>This is a private room.</p>}
            {room.isAdmin && (
                <JoinRequests requests={room.members.filter((member) => !member.accepted)} roomId={room.id} />
            )}
            {isAuthorized ? (
                <MembersList members={room.acceptedMembers} isAdmin={room.isAdmin} roomId={id} />
            ) : (
                <div>You need to be an accepted member to see other members of this room.</div>
            )}
            {!room.isAdmin && (
                <MembershipButton
                    isPublic={room.public}
                    isAccepted={room.isAccepted}
                    isMember={room.isMember}
                    roomId={id}
                />
            )}
            {isAuthorized ? (
                <Messages messages={room.messages} roomId={id} />
            ) : (
                <div>You need to be an accepted member to see the messages.</div>
            )}
            {(room.isAdmin || room.isAccepted) && <CreateMessage roomId={id} />}
        </div>
    );
}
