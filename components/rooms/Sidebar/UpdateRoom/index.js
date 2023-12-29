"use client";

import { updateRoom } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";
import css from "./index.module.css";

export default function UpdateRoom({ id, name, isPublic }) {
    const formRef = useRef(null);

    async function handleNameUpdate(formData) {
        const name = formData.get("name");
        if (!name) return;

        const res = await updateRoom(id, name, isPublic);

        if (res.success) formRef.current.reset();
    }

    return (
        <>
            <AsyncButton
                className={isPublic ? css["make-private"] : css["make-public"]}
                content={isPublic ? "Make room private" : "Make room public"}
                loadingContent={isPublic ? "Making room private..." : "Making room public..."}
                mainAction={() => updateRoom(id, name, !isPublic)}
            />
            <form ref={formRef} action={handleNameUpdate}>
                <input type="hidden" name="id" value={id} />
                <input className={css.input} type="text" name="name" placeholder="New Room Name" />
                <SubmitButton className={css.submit} loading="Updating..." content="Update Name" />
            </form>
        </>
    );
}
