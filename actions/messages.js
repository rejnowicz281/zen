"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function createMessage(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const text = formData.get("text");
    const room_id = formData.get("room_id");

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

export async function deleteMessage(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("messages").update({ deleted: true }).match({ id });

    if (error) {
        const data = {
            action: "deleteMessage",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    const data = {
        action: "deleteMessage",
        success: true,
        id,
    };
    console.log(data);
    return data;
}
