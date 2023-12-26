"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Messages({ messages, roomId }) {
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const channel = supabase
            .channel(roomId || "public")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `room_id=eq.${roomId}`,
                },
                (payload) => {
                    console.log("Message received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to channel", channel.topic);

        return () => supabase.removeChannel(channel);
    }, [supabase, router, roomId]);

    return (
        <ul>
            {messages.map((message) => (
                <li key={message.id}>
                    <b>{message.user.display_name}: </b>
                    <p>{message.text}</p>
                </li>
            ))}
        </ul>
    );
}
