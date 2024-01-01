import { deleteRoom } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function DeleteRoom({ id }) {
    const { closeModal } = useModalContext();

    return (
        <>
            <h3 className={css.sure}>Are you sure?</h3>
            <AsyncButton
                className={css.button}
                mainAction={async () => {
                    await deleteRoom(id);
                    closeModal();
                }}
                content="Delete Room"
                loadingContent="Deleting..."
            />
        </>
    );
}
