"use client";

import { createRoomMembership, deleteRoomMembership } from "@/actions/rooms";
import useAuthContext from "@/providers/AuthProvider";

export default function MembershipButton({ isMember, roomId, isPublic, isAccepted }) {
    const { user } = useAuthContext();

    return (
        <button
            onClick={
                isMember
                    ? () => deleteRoomMembership(roomId, user.id)
                    : () => createRoomMembership(roomId, user.id, isPublic)
            }
        >
            {isMember ? (isAccepted ? "Leave" : "Cancel Join Request") : "Join"}
        </button>
    );
}
