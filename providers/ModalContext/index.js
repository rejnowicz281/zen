"use client";

import Modal from "@/components/general/Modal";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);

    function closeModal() {
        setModalContent(null);
    }

    return (
        <ModalContext.Provider
            value={{
                modalContent,
                setModalContent,
                closeModal,
            }}
        >
            {modalContent && <Modal />}
            {children}
        </ModalContext.Provider>
    );
}

export default function useModalContext() {
    const context = useContext(ModalContext);

    if (!context) throw new Error("useModalContext must be used within a ModalContext Provider");

    return context;
}
