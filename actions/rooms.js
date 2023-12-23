"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getRooms() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: rooms, error } = await supabase
        .from("rooms")
        .select("id, name")
        .order("created_at", { ascending: true });

    return rooms;
}

export async function getRoom(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const [roomData, messagesData] = await Promise.all([
        supabase.from("rooms").select("id, name, admin: users(id, email)").eq("id", id).single(),
        supabase
            .from("messages")
            .select("id, created_at, text, user: users (id, email)")
            .eq("room_id", id)
            .order("created_at", { ascending: true }),
    ]);

    const room = {
        ...roomData.data,
        messages: messagesData.data,
    };

    return room;
}

export async function createRoom(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get("name");

    const { data: room, error } = await supabase.from("rooms").insert([{ name, admin_id: user.id }]);

    if (error) {
        const data = {
            action: "createRoom",
            success: false,
            error,
        };
        console.error(data);
        return data;
    }

    revalidatePath("/");

    const data = {
        action: "createRoom",
        success: true,
        name,
    };
    console.log(data);
    return data;
}
