"use client";

import useAuthContext from "@/providers/AuthProvider";
import Link from "next/link";

export default function ProfileLink({ text }) {
    const { user } = useAuthContext();

    return <Link href={`/users/${user.id}`}>{text}</Link>;
}
