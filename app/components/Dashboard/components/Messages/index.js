"use client";

import { createMessage } from "@/actions/messages";
import SubmitButton from "@/components/SubmitButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Messages({ messages }) {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const formRef = useRef(null);

    useEffect(() => {
        const channel = supabase
            .channel("messages")
            .on("postgres_changes", { schema: "public", event: "*", table: "messages" }, () => router.refresh())
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [supabase, router]);

    async function handleAction(formData) {
        if (!formData.get("text")) return;

        const res = await createMessage(formData);

        if (res.success) formRef.current.reset();
    }

    return (
        <>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <b>{message.user.email}: </b>
                        <p>{message.text}</p>
                    </li>
                ))}
            </ul>
            <form action={handleAction} ref={formRef}>
                <input type="text" name="text" />
                <SubmitButton content="Send" loading="Sending..." />
            </form>
        </>
    );
}
