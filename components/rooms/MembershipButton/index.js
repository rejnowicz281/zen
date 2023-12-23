"use client";

import { createRoomMembership, deleteRoomMembership } from "@/actions/rooms";
import useAuthContext from "@/providers/AuthProvider";

export default function MembershipButton({ isMember, roomId }) {
    const { user } = useAuthContext();

    return (
        <button
            onClick={
                isMember ? () => deleteRoomMembership(roomId, user.id) : () => createRoomMembership(roomId, user.id)
            }
        >
            {isMember ? "Leave" : "Join"}
        </button>
    );
}
