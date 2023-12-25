"use client";

import { deleteRoomMembership, updateRoomMembership } from "@/actions/rooms";
import Link from "next/link";

export default function JoinRequests({ requests, roomId }) {
    return (
        <div>
            {requests.map((requester) => (
                <div key={requester.id}>
                    <div>
                        <Link href={`/users/${requester.id}`}>{requester.email}</Link>
                    </div>
                    <button onClick={() => updateRoomMembership(roomId, requester.id, true)}>Accept</button>
                    <button onClick={() => deleteRoomMembership(roomId, requester.id)}>Decline</button>
                </div>
            ))}
        </div>
    );
}
