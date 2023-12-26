"use client";

import { deleteRoomMembership } from "@/actions/rooms";
import Image from "next/image";
import Link from "next/link";

export default function MembersList({ members, isAdmin, roomId }) {
    return (
        <ul>
            {members.map((member) => (
                <li key={member.id}>
                    <Link href={`/users/${member.id}`}>
                        <Image src={member.avatar_url} width={32} height={32} />
                        {member.display_name}
                    </Link>
                    {isAdmin && <button onClick={() => deleteRoomMembership(roomId, member.id)}>Kick</button>}
                </li>
            ))}
        </ul>
    );
}
