"use client";

import { createRoom } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import useModalContext from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import css from "./index.module.css";

export default function CreateRoom() {
    const router = useRouter();
    const { closeModal } = useModalContext();

    async function handleAction(formData) {
        if (!formData.get("name")) return;

        const res = await createRoom(formData);

        if (res.success) {
            closeModal();
            router.push(`/rooms/${res.id}`);
        }
    }

    return (
        <form action={handleAction} className={css.form}>
            <input placeholder="Name goes here..." type="text" name="name" className={css.name} />
            <div className={css["checkbox-container"]}>
                <input type="checkbox" id="public" name="public" defaultChecked />
                <label htmlFor="public">Public</label>
            </div>
            <SubmitButton className={css.submit} content="Create Room" loading="Creating..." />
        </form>
    );
}
