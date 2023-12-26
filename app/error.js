"use client";

import Link from "next/link";

export default function ErrorPage() {
    return (
        <div>
            There has been an error. Have you tried <Link href="/login">Logging in</Link>?
        </div>
    );
}
