import MainSidebar from "@/components/general/MainSidebar";
import NavbarRooms from "@/components/navbars/NavbarRooms";
import NavbarUsers from "@/components/navbars/NavbarUsers";
import { AuthProvider } from "@/providers/AuthProvider";
import { PresenceProvider } from "@/providers/PresenceProvider";
import RealTimeRoomsProvider from "@/providers/RealTimeRoomsProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import css from "./layout.module.css";

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <AuthProvider user={user}>
            <RealTimeRoomsProvider>
                <PresenceProvider>
                    <div className={css.container}>
                        <MainSidebar NavbarRooms={<NavbarRooms />} NavbarUsers={<NavbarUsers />} />
                        <main className={css.main}>{children}</main>
                    </div>
                </PresenceProvider>
            </RealTimeRoomsProvider>
        </AuthProvider>
    );
}
