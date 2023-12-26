"use client";

import { deleteMessage } from "@/actions/messages";
import useAuthContext from "@/providers/AuthProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Messages({ messages, roomId, isAdmin }) {
    const { user } = useAuthContext();

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
                    console.log("Change received", payload.new);
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
                    {!message.deleted && (isAdmin || message.user.id === user.id) && (
                        <button onClick={() => deleteMessage(message.id)}>Delete</button>
                    )}
                    <p>{message.deleted ? "This message was deleted." : message.text}</p>
                </li>
            ))}
        </ul>
    );
}
