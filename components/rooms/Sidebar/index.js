"use client";

import { createRoomMembership, deleteRoomMembership } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import useAuthContext from "@/providers/AuthProvider";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DeleteRoomButton from "./DeleteRoomButton";
import MembersContainer from "./MembersContainer";
import UpdateRoom from "./UpdateRoom";
import css from "./index.module.css";

export default function Sidebar({ room }) {
    const { user } = useAuthContext();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    async function handleCreateRoomMembership(formData) {
        formData.append("accepted", room.public);

        await createRoomMembership(formData);
    }

    return (
        <>
            <button onClick={toggleSidebar} className={css.toggle} type="button">
                <AiOutlineInfoCircle />
            </button>
            <div className={`${css.wrapper}${sidebarOpen ? ` ${css.open}` : ""}`}>
                <div className={css.container}>
                    <h1 className={css.heading}>{room.name}</h1>
                    {!room.public && <p className={css.private}>This room is private.</p>}
                    {room.isAdmin && (
                        <>
                            <DeleteRoomButton id={room.id} />
                            <UpdateRoom id={room.id} isPublic={room.public} />
                        </>
                    )}
                    {!room.isAdmin &&
                        (room.isMember ? (
                            <form action={deleteRoomMembership}>
                                <input type="hidden" name="user_id" value={user.id} />
                                <input type="hidden" name="room_id" value={room.id} />
                                <SubmitButton
                                    className={css.leave}
                                    content={room.isAccepted ? "Leave Room" : "Cancel Join Request"}
                                    loading={room.isAccepted ? "Leaving..." : "Cancelling..."}
                                />
                            </form>
                        ) : (
                            <form action={handleCreateRoomMembership}>
                                <input type="hidden" name="user_id" value={user.id} />
                                <input type="hidden" name="room_id" value={room.id} />
                                <SubmitButton className={css.join} content="Join Room" loading="Joining..." />
                            </form>
                        ))}
                    <MembersContainer
                        members={room.members}
                        roomId={room.id}
                        isAdmin={room.isAdmin}
                        roomAdmin={room.admin}
                        isAccepted={room.isAccepted}
                    />
                </div>
            </div>
        </>
    );
}
