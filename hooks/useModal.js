import Modal from "@/components/general/Modal";
import { useCallback, useState } from "react";

export default function useModal() {
    const [modalContent, setModalContent] = useState(null);

    function closeModal() {
        setModalContent(null);
    }

    const getModal = useCallback(() => {
        return modalContent && <Modal>{modalContent}</Modal>;
    }, [modalContent]);

    return {
        modalContent,
        setModalContent,
        closeModal,
        Modal: () => getModal(),
    };
}
