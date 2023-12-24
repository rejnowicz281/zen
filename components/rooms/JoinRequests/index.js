"use client";

import { deleteRoomMembership, updateRoomMembership } from "@/actions/rooms";

export default function JoinRequests({ requests, roomId }) {
    return (
        <div>
            {requests.map((requester) => (
                <div key={requester.id}>
                    <p>{requester.email}</p>
                    <button onClick={() => updateRoomMembership(roomId, requester.id, true)}>Accept</button>
                    <button onClick={() => deleteRoomMembership(roomId, requester.id)}>Decline</button>
                </div>
            ))}
        </div>
    );
}
