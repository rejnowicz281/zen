import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <AuthProvider user={user}>{children}</AuthProvider>;
}
