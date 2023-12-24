"use client";

import { createRoom } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";

export default function CreateRoom() {
    const formRef = useRef(null);

    async function handleAction(formData) {
        if (!formData.get("name")) return;

        const res = await createRoom(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="text" name="name" />
            <input type="checkbox" name="public" defaultChecked />
            <label htmlFor="public">Public</label>
            <SubmitButton content="Create Room" loading="Creating..." />
        </form>
    );
}
