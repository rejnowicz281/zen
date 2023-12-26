import { AuthProvider } from "@/providers/AuthProvider";
import RealTimeRoomsProvider from "@/providers/RealTimeRoomsProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <AuthProvider user={user}>
            <RealTimeRoomsProvider>{children}</RealTimeRoomsProvider>
        </AuthProvider>
    );
}
