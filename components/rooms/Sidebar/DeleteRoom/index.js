import { deleteRoom } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import css from "./index.module.css";

export default function DeleteRoom({ id }) {
    return (
        <AsyncButton
            className={css.button}
            mainAction={async () => {
                await deleteRoom(id);
            }}
            content="Delete Room"
            loadingContent="Deleting..."
        />
    );
}
