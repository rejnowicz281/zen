import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function ModalImage({ src }) {
    const { closeModal } = useModalContext();

    return (
        <div className={css.container}>
            <img onClick={() => closeModal()} className={css.image} src={src} />
        </div>
    );
}
