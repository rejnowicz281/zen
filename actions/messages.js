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
    const imageFile = formData.get("image");

    const bucket = supabase.storage.from("messages_images");
    const fileName = `room_${room_id}/message_${Date.now()}`;

    const { data: image, imageError } = await bucket.upload(fileName, imageFile);

    if (imageError) {
        const data = {
            action: "createMessage",
            success: false,
            imageError,
        };
        console.error(data);
        return data;
    }

    const image_url = imageFile.type.startsWith("image/") ? bucket.getPublicUrl(fileName).data.publicUrl : null;

    const { data: message, messageError } = await supabase
        .from("messages")
        .insert([{ text, user_id: user.id, room_id, image_url }]);

    if (messageError) {
        const data = {
            action: "createMessage",
            success: false,
            messageError,
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
