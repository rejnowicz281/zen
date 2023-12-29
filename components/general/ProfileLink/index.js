"use client";

import useAuthContext from "@/providers/AuthProvider";
import Link from "next/link";

export default function ProfileLink() {
    const { user } = useAuthContext();

    return <Link href={`/users/${user.id}`}>Go to your profile</Link>;
}
