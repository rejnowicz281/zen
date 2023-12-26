"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// this provider is used to listen for any changes made to the rooms table (e.g. new room created, room deleted, room updated)

export default function RealTimeRoomsProvider({ children }) {
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const roomsChannel = supabase
            .channel("rooms")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "rooms",
                },
                (payload) => {
                    console.log("Change received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to rooms channel", roomsChannel.topic);

        return () => {
            supabase.removeChannel(roomsChannel);
        };
    }, [supabase, router]);

    return <>{children}</>;
}
