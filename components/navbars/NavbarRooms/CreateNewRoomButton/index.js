"use client";

import useModalContext from "@/providers/ModalContext";
import cssNavbar from "../../index.module.css";
import CreateRoom from "./CreateRoom";

export default function CreateNewRoomButton() {
    const { setModalContent } = useModalContext();

    return (
        <button onClick={() => setModalContent(<CreateRoom />)} className={cssNavbar["main-button"]}>
            Create New Room
        </button>
    );
}
