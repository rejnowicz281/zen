"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const [roomData, messagesData, membersData] = await Promise.all([
        supabase
            .from("rooms")
            .select("id, name, public, admin: users(id, email, avatar_url, display_name)")
            .eq("id", id)
            .single(),
        supabase
            .from("messages")
            .select("id, created_at, text, deleted, image_url, user: users (id, email, avatar_url, display_name)")
            .eq("room_id", id)
            .order("created_at", { ascending: true }),
        supabase
            .from("room_memberships")
            .select("accepted, user: users (id, email, avatar_url, display_name)")
            .eq("room_id", id),
    ]);

    const member = membersData.data.find((member) => member.user.id === user.id);

    const room = {
        ...roomData.data,
        messages: messagesData.data,
        members: membersData.data.map((member) => ({ accepted: member.accepted, ...member.user })),
        acceptedMembers: membersData.data.filter((member) => member.accepted).map((member) => member.user),
        isMember: !!member,
        isAccepted: member?.accepted || false,
        isAdmin: roomData.data.admin?.id === user.id,
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
    const is_public = formData.get("public") === "on";

    const { data: room, error } = await supabase.from("rooms").insert([{ name, admin_id: user.id, public: is_public }]);

    if (error) return actionError("createRoom", { error });

    revalidatePath("/");

    return actionSuccess("createRoom", { name });
}

export async function updateRoom(id, name, is_public) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const updateData = { name, public: is_public };

    const { data: room, error } = await supabase.from("rooms").update(updateData).eq("id", id);

    if (error) return actionError("updateRoom", { error });

    revalidatePath(`/rooms/${id}`);

    return actionSuccess("updateRoom", updateData);
}

export async function deleteRoom(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: room, error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) return actionError("deleteRoom", { error });

    revalidatePath("/");

    return actionSuccess("deleteRoom", { id });
}

export async function createRoomMembership(room_id, user_id, room_is_public) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .insert([{ user_id, room_id, accepted: room_is_public }]);

    if (error) return actionError("createRoomMembership", { error });

    revalidatePath(`/rooms/${room_id}`);

    return actionSuccess("createRoomMembership", { room_id, user_id });
}

export async function updateRoomMembership(room_id, user_id, accepted) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .update({ accepted })
        .eq("user_id", user_id)
        .eq("room_id", room_id);

    if (error) return actionError("updateRoomMembership", { error });

    revalidatePath("/");

    return actionSuccess("updateRoomMembership", { room_id, user_id, accepted });
}

export async function deleteRoomMembership(room_id, user_id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .delete()
        .eq("user_id", user_id)
        .eq("room_id", room_id);

    if (error) return actionError("deleteRoomMembership", { error });

    revalidatePath(`/rooms/${room_id}`);

    return actionSuccess("deleteRoomMembership", { room_id, user_id });
}
