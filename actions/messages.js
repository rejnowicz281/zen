"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getPublicMessages() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: messages, error } = await supabase
        .from("messages")
        .select("id, created_at, text, user: users (id, email)")
        .order("created_at", { ascending: true })
        .is("room_id", null);

    return messages;
}

export async function createMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text");
    const room_id = formData.get("room_id") || null;

    const { data: message, error } = await supabase.from("messages").insert([{ text, user_id: user.id, room_id }]);

    if (error) {
        const data = {
            action: "createMessage",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    const data = {
        action: "createMessage",
        success: true,
        text,
    };
    console.log(data);
    return data;
}
