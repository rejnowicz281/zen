"use client";

import { createMessage } from "@/actions/messages";
import SubmitButton from "@/components/general/SubmitButton";
import Image from "next/image";
import { useRef, useState } from "react";

export default function CreateMessage({ roomId }) {
    const formRef = useRef(null);
    const [imageUrl, setImageUrl] = useState(null);

    async function handleAction(formData) {
        if (!formData.get("text")) return;

        const res = await createMessage(formData);

        if (res.success) {
            setImageUrl(null);
            formRef.current.reset();
        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        setImageUrl(URL.createObjectURL(file));
    }

    return (
        <form action={handleAction} ref={formRef}>
            <input type="hidden" name="room_id" value={roomId} />
            <input type="text" name="text" />
            <SubmitButton content="Send" loading="Sending..." />
            <label htmlFor="image">Attach image (optional)</label>
            <input onChange={handleImageChange} type="file" name="image" />
            {imageUrl && <Image src={imageUrl} width={100} height={100} />}
        </form>
    );
}
