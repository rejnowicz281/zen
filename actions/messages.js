"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
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

    const image_url = imageFile.type.startsWith("image/") ? bucket.getPublicUrl(fileName).data.publicUrl : null;

    const { data: message, messageError } = await supabase
        .from("messages")
        .insert([{ text, user_id: user.id, room_id, image_url }]);

    if (messageError) return actionError("createMessage", { messageError });

    const { data: image, imageError } = await bucket.upload(fileName, imageFile);

    if (imageError) return actionError("createMessage", { imageError });

    return actionSuccess("createMessage", { text });
}

export async function deleteMessage(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: message, error } = await supabase.from("messages").delete().eq("id", id);

    if (error) return actionError("deleteMessage", { error });

    return actionSuccess("deleteMessage", { id });
}
