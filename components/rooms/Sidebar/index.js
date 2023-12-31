"use client";

import { createRoomMembership, deleteRoomMembership } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import useAuthContext from "@/providers/AuthProvider";
import usePresenceContext from "@/providers/PresenceProvider";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DeleteRoom from "./DeleteRoom";
import MembersList from "./MembersList";
import UpdateRoom from "./UpdateRoom";
import css from "./index.module.css";

export default function Sidebar({ room }) {
    const { user } = useAuthContext();
    const { loggedUsers } = usePresenceContext();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
    }

    const onlineMembers = room.members.filter((user) => loggedUsers.includes(user.id));
    const offlineMembers = room.members.filter((user) => !loggedUsers.includes(user.id));

    return (
        <>
            <button onClick={toggleSidebar} className={css.toggle} type="button">
                <AiOutlineInfoCircle />
            </button>
            <div className={`${css.container}${sidebarOpen ? ` ${css.open}` : ""}`}>
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
                <div className={css.members}>
                    {onlineMembers.length > 0 && (
                        <>
                            <h5 className={css["members-heading"]}>Online Members ({onlineMembers.length})</h5>
                            <MembersList
                                roomId={room.id}
                                members={onlineMembers}
                                roomAdmin={room.admin}
                                isAdmin={room.isAdmin}
                            />
                        </>
                    )}
                    {offlineMembers.length > 0 && (
                        <>
                            <h5 className={css["members-heading"]}>Offline Members</h5>
                            <MembersList
                                roomId={room.id}
                                members={offlineMembers}
                                roomAdmin={room.admin}
                                isAdmin={room.isAdmin}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
