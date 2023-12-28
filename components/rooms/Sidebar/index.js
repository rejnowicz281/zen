"use client";

import { createRoomMembership, deleteRoomMembership, updateRoomMembership } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import DeleteRoom from "./DeleteRoom";
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
                    <h3>Members</h3>
                    <div className={css["member-container"]}>
                        <UserBox user={room.admin} adminTag={true} />
                    </div>
                    {room.isAdmin &&
                        room.members
                            .filter((member) => !member.accepted)
                            .map((member) => (
                                <div className={css["member-container"]} key={member.id}>
                                    <UserBox user={member} />
                                    <AsyncButton
                                        className={css.accept}
                                        mainAction={() => updateRoomMembership(room.id, member.id, true)}
                                        content="Accept"
                                        loadingContent="Accepting..."
                                    />
                                    <AsyncButton
                                        className={css.reject}
                                        mainAction={() => deleteRoomMembership(room.id, member.id)}
                                        content="Reject"
                                        loadingContent="Rejecting..."
                                    />
                                </div>
                            ))}
                    {room.acceptedMembers.map((member) => (
                        <div className={css["member-container"]} key={member.id}>
                            <UserBox user={member} adminTag={member.id === room.admin.id} />
                            {room.isAdmin && member.id !== room.admin && (
                                <AsyncButton
                                    className={css.kick}
                                    mainAction={() => deleteRoomMembership(room.id, member.id)}
                                    content="Kick"
                                    loadingContent="Kicking..."
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
