"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getUserInfo(id) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const [userData, userRoomsData, adminRoomsData] = await Promise.all([
        supabase.from("users").select("id, email, display_name, avatar_url").eq("id", id).single(),
        supabase
            .from("rooms")
            .select("id, name")
            .in(
                "id",
                await supabase
                    .from("room_memberships")
                    .select("room_id")
                    .eq("user_id", id)
                    .eq("accepted", true)
                    .then((res) => res.data.map((row) => row.room_id))
            ),
        supabase.from("rooms").select("id, name").eq("admin_id", id),
    ]);

    const userInfo = {
        ...userData.data,
        memberRooms: userRoomsData.data,
        adminRooms: adminRoomsData.data,
    };
    return userInfo;
}
