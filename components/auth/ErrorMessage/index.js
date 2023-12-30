"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorMessage({ className }) {
    const message = useSearchParams().get("message");

    if (!message) return null;

    return <div className={className}>{message}</div>;
}
