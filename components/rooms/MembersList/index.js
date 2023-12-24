"use client";

import { deleteRoomMembership } from "@/actions/rooms";

export default function MembersList({ members, isAdmin, roomId }) {
    return (
        <ul>
            {members.map((member) => (
                <li key={member.id}>
                    {member.email}
                    {isAdmin && <button onClick={() => deleteRoomMembership(roomId, member.id)}>Kick</button>}
                </li>
            ))}
        </ul>
    );
}
