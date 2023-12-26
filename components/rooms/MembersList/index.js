"use client";

import { deleteRoomMembership } from "@/actions/rooms";
import Link from "next/link";

export default function MembersList({ members, isAdmin, roomId }) {
    return (
        <ul>
            {members.map((member) => (
                <li key={member.id}>
                    <Link href={`/users/${member.id}`}>{member.display_name}</Link>
                    {isAdmin && <button onClick={() => deleteRoomMembership(roomId, member.id)}>Kick</button>}
                </li>
            ))}
        </ul>
    );
}
