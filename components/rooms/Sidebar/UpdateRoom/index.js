"use client";

import { updateRoom } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";
import css from "./index.module.css";

export default function UpdateRoom({ id, isPublic }) {
    const formRef = useRef(null);

    async function handleNameUpdate(formData) {
        const name = formData.get("name");
        if (!name) return;

        const res = await updateRoom(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <>
            <form action={updateRoom}>
                <input type="hidden" name="public" value={!isPublic} />
                <input type="hidden" name="id" value={id} />
                <SubmitButton
                    className={isPublic ? css["make-private"] : css["make-public"]}
                    loading={isPublic ? "Making room private..." : "Making room public..."}
                    content={isPublic ? "Make room private" : "Make room public"}
                />
            </form>

            <form ref={formRef} action={handleNameUpdate}>
                <input type="hidden" name="id" value={id} />
                <input className={css.input} type="text" name="name" placeholder="New Room Name" />
                <SubmitButton className={css.submit} loading="Updating..." content="Update Name" />
            </form>
        </>
    );
}
