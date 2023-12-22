"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getMessages() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: messages, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

    return messages;
}

export async function createMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text");

    const { data: message, error } = await supabase.from("messages").insert([{ text, user_id: user.id }]);

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
        text: text,
    };
    console.log(data);
    return data;
}
