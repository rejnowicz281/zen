import { deleteUser } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import useModalContext from "@/providers/ModalContext";
import css from "./index.module.css";

export default function DeleteUser({ id }) {
    const { closeModal } = useModalContext();

    async function handleDeleteUser(formData) {
        await deleteUser(formData);

        closeModal();
    }

    return (
        <>
            <h3 className={css.sure}>Are you sure?</h3>
            <form action={deleteUser}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton className={css.button} content="Delete your account" loading="Deleting..." />
            </form>
        </>
    );
}
