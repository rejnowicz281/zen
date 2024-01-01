import useModalContext from "@/providers/ModalContext";
import DeleteRoom from "./DeleteRoom";
import css from "./index.module.css";

export default function DeleteRoomButton({ id }) {
    const { setModalContent } = useModalContext();

    return (
        <button onClick={() => setModalContent(<DeleteRoom id={id} />)} className={css.button}>
            Delete Room
        </button>
    );
}
