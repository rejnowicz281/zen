"use client";

import { createMessage } from "@/actions/messages";
import ImagePicker from "@/components/general/ImagePicker";
import SubmitButton from "@/components/general/SubmitButton";
import { useRef } from "react";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import css from "./index.module.css";

export default function CreateMessage({ roomId }) {
    const formRef = useRef(null);

    async function handleAction(formData) {
        if (!formData.get("text")) return;

        const res = await createMessage(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <form className={css.form} ref={formRef} action={handleAction}>
            <input type="hidden" name="room_id" value={roomId} />
            <label htmlFor="image">Attach an image (optional)</label>
            <div className={css["image-picker-wrapper"]}>
                <ImagePicker name="image" id="image" />
            </div>
            <div className={css["input-box"]}>
                <input placeholder="Type your message here..." className={css.input} type="text" name="text" />
                <SubmitButton
                    className={css.submit}
                    content={<AiOutlineSend />}
                    loading={<AiOutlineLoading className={css.spin} />}
                />
            </div>
        </form>
    );
}
