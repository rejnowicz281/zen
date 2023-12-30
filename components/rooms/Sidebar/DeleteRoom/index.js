import { deleteRoom } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import { useRouter } from "next/navigation";
import css from "./index.module.css";

export default function DeleteRoom({ id }) {
    const router = useRouter();

    return (
        <AsyncButton
            className={css.button}
            mainAction={async () => {
                const res = await deleteRoom(id);
                if (res.success) router.push("/");
            }}
            content="Delete Room"
            loadingContent="Deleting..."
        />
    );
}
