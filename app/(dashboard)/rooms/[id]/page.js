import { getRoom } from "@/actions/rooms";
import MessagesContainer from "@/components/rooms/MessagesContainer";
import Sidebar from "@/components/rooms/Sidebar";
import RealTimeRoomProvider from "@/providers/RealTimeRoomProvider";
import css from "./page.module.css";

export default async function RoomPage({ params: { id } }) {
    const room = await getRoom(id);

    return (
        <RealTimeRoomProvider roomId={id}>
            <div className={css.container}>
                <MessagesContainer
                    roomId={id}
                    isAdmin={room.isAdmin}
                    isAccepted={room.isAccepted}
                    roomIsPublic={room.public}
                    messages={room.messages}
                />
                <Sidebar room={room} />
            </div>
        </RealTimeRoomProvider>
    );
}
