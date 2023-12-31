"use client";

import { deleteUser } from "@/actions/auth";
import AsyncButton from "@/components/general/AsyncButton";
import useAuthContext from "@/providers/AuthProvider";
import css from "./index.module.css";

export default function DeleteUserButton(id) {
    const { user } = useAuthContext();

    if (user.id !== id.id || user.display_name === "Demo User" || user.id === process.env.DEMO_USER_ID) return;

    return (
        <AsyncButton
            className={css.button}
            content="Delete your account"
            loadingContent="Deleting..."
            mainAction={() => deleteUser(id.id)}
        />
    );
}
