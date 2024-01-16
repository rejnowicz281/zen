"use server";

import actionError from "@/utils/actions/actionError";
import actionSuccess from "@/utils/actions/actionSuccess";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getRandomRoomId() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: rooms, error } = await supabase.from("rooms").select("id");

    if (error) return actionError("getRandomRoomId", { error });

    if (!rooms.length) return null;

    const ids = rooms.map((room) => room.id);

    const randomId = ids[Math.floor(Math.random() * ids.length)];

    return randomId;
}

export async function getRooms() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: rooms, error } = await supabase
        .from("rooms")
        .select("id, name")
        .order("created_at", { ascending: false });

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

    if (roomData.error) return actionError("getRoom", { error: roomData.error });
    if (messagesData.error) return actionError("getRoom", { error: messagesData.error });
    if (membersData.error) return actionError("getRoom", { error: membersData.error });

    const member = membersData.data.find((member) => member.user.id === user.id);

    const room = {
        ...roomData.data,
        messages: messagesData.data,
        members: membersData.data.map((member) => ({ accepted: member.accepted, ...member.user })),
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

    const { data: room, error } = await supabase
        .from("rooms")
        .insert([{ name, admin_id: user.id, public: is_public }])
        .select("id");

    if (error) return actionError("createRoom", { error });

    return actionSuccess("createRoom", { id: room[0].id, name });
}

export async function updateRoom(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");
    const name = formData.get("name");
    const is_public = formData.get("public");

    const updateData = {};
    if (name) updateData.name = name;
    if (is_public) updateData.public = is_public;

    const { data: room, error } = await supabase.from("rooms").update(updateData).eq("id", id);

    if (error) return actionError("updateRoom", { error });

    return actionSuccess("updateRoom", updateData);
}

export async function deleteRoom(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const id = formData.get("id");

    const { data: room, error } = await supabase.from("rooms").delete().eq("id", id);

    if (error) return actionError("deleteRoom", { error });

    return actionSuccess("deleteRoom", { id }, "/");
}

export async function createRoomMembership(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const room_id = formData.get("room_id");
    const user_id = formData.get("user_id");
    const accepted = formData.get("accepted");

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .insert([{ user_id, room_id, accepted }]);

    if (error) return actionError("createRoomMembership", { error });

    return actionSuccess("createRoomMembership", { room_id, user_id, accepted });
}

export async function updateRoomMembership(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const room_id = formData.get("room_id");
    const user_id = formData.get("user_id");
    const accepted = formData.get("accepted");

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .update({ accepted })
        .eq("user_id", user_id)
        .eq("room_id", room_id);

    if (error) return actionError("updateRoomMembership", { error });

    return actionSuccess("updateRoomMembership", { room_id, user_id, accepted });
}

export async function deleteRoomMembership(formData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const room_id = formData.get("room_id");
    const user_id = formData.get("user_id");

    const { data: membership, error } = await supabase
        .from("room_memberships")
        .delete()
        .eq("user_id", user_id)
        .eq("room_id", room_id);

    if (error) return actionError("deleteRoomMembership", { error });

    return actionSuccess("deleteRoomMembership", { room_id, user_id });
}
