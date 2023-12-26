"use client";

import useAuthContext from "@/providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

export default function Greetings() {
    const { user } = useAuthContext();

    return (
        <>
            Hey,
            <Link href={`/users/${user.id}`}>
                <Image src={user.avatar_url} width={32} height={32} />
                {user.display_name}
            </Link>
            !
        </>
    );
}
