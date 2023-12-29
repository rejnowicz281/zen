"use client";

import { createRoom } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";
import css from "./index.module.css";

export default function CreateRoom() {
    const formRef = useRef(null);

    async function handleAction(formData) {
        if (!formData.get("name")) return;

        const res = await createRoom(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <form action={handleAction} ref={formRef} className={css.form}>
            <input placeholder="Name goes here..." type="text" name="name" className={css.name} />
            <div className={css["checkbox-container"]}>
                <input type="checkbox" id="public" name="public" defaultChecked />
                <label htmlFor="public">Public</label>
            </div>
            <SubmitButton className={css.submit} content="Create Room" loading="Creating..." />
        </form>
    );
}
