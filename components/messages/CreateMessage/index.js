"use client";

import { createMessage } from "@/actions/messages";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";

export default function CreateMessage({ roomId }) {
    const formRef = useRef(null);

    async function handleAction(formData) {
        if (!formData.get("text")) return;

        const res = await createMessage(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="hidden" name="room_id" value={roomId} />
            <input type="text" name="text" />
            <SubmitButton content="Send" loading="Sending..." />
        </form>
    );
}
