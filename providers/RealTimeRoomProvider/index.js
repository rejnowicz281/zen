"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// this provider is used to listen for changes to messages and memberships in a given room
// (e.g. message created, message deleted, new member added, member removed)

export default function RealTimeRoomProvider({ children, roomId }) {
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const messagesChannel = supabase
            .channel(`messages#${roomId}`)
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

        console.log("Connected to messages channel", messagesChannel.topic);

        const membershipsChannel = supabase
            .channel(`memberships#${roomId}`)
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "room_memberships",
                    filter: `room_id=eq.${roomId}`,
                },
                (payload) => {
                    console.log("Change received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to memberships channel", membershipsChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
            supabase.removeChannel(membershipsChannel);
        };
    }, [supabase, router, roomId]);

    return <>{children}</>;
}
