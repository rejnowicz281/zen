"use client";

import { createRoomMembership, deleteRoomMembership } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import useAuthContext from "@/providers/AuthProvider";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DeleteRoom from "./DeleteRoom";
import MembersContainer from "./MembersContainer";
import UpdateRoom from "./UpdateRoom";
import css from "./index.module.css";

export default function Sidebar({ room }) {
    const { user } = useAuthContext();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
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
                            <DeleteRoom id={room.id} />
                            <UpdateRoom id={room.id} name={room.name} isPublic={room.public} />
                        </>
                    )}
                    {!room.isAdmin &&
                        (room.isMember ? (
                            <AsyncButton
                                className={css.leave}
                                mainAction={() => deleteRoomMembership(room.id, user.id)}
                                content={room.isAccepted ? "Leave Room" : "Cancel Join Request"}
                                loadingContent={room.isAccepted ? "Leaving..." : "Cancelling..."}
                            />
                        ) : (
                            <AsyncButton
                                className={css.join}
                                mainAction={() => createRoomMembership(room.id, user.id, room.public)}
                                content="Join Room"
                                loadingContent="Joining..."
                            />
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
