"use client";

import useAuthContext from "@/providers/AuthProvider";

export default function Greetings() {
    const { user } = useAuthContext();

    return <>Hey, {user.email}!</>;
}
