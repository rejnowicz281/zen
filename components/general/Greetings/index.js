"use client";

import useAuthContext from "@/providers/AuthProvider";
import Link from "next/link";

export default function Greetings() {
    const { user } = useAuthContext();

    return (
        <>
            Hey, <Link href={`/users/${user.id}`}>{user.display_name}</Link>!
        </>
    );
}
