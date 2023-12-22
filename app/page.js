import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

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
        <Login />
    );
}
