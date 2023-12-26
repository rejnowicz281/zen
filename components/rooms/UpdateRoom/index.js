"use client";

import { deleteRoom, updateRoom } from "@/actions/rooms";

export default function UpdateRoom({ name, isPublic, id }) {
    return (
        <>
            <button onClick={() => updateRoom(id, name, !isPublic)}>
                {isPublic ? "Make room private" : "Make room public"}
            </button>
            <button onClick={() => deleteRoom(id)}>Delete room</button>
            <form
                action={(formData) => {
                    const name = formData.get("name");
                    if (!name) return;

                    updateRoom(id, name, isPublic);
                }}
            >
                <input type="text" name="name" defaultValue={name} />
                <button>Update room name</button>
            </form>
        </>
    );
}
