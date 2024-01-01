"use client";

import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function Modal() {
    const { closeModal, modalContent } = useModalContext();

    return (
        <>
            <div className={css.overlay} onClick={closeModal}></div>
            <div className={css.modal}>{modalContent}</div>
        </>
    );
}
