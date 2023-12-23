import Dashboard from "@/components/general/Dashboard";
import LandingPage from "@/components/general/LandingPage";
import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <AuthProvider user={user}>
            <Dashboard />
        </AuthProvider>
    ) : (
        <LandingPage />
    );
}
