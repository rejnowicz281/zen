import { deleteRoom } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function DeleteRoom({ id }) {
    const { closeModal } = useModalContext();

    async function handleDeleteRoom(formData) {
        await deleteRoom(formData);

        closeModal();
    }

    return (
        <>
            <h3 className={css.sure}>Are you sure?</h3>
            <form action={handleDeleteRoom}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton className={css.button} loading="Deleting..." content="Delete Room" />
            </form>
        </>
    );
}
