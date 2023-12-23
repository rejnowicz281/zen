import LandingPage from "@/components/general/LandingPage";
import { AuthProvider } from "@/providers/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata = {
    title: "zen",
    description: "Talk with your friends. Or don't.",
};

export default async function RootLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="en">
            <body>{user ? <AuthProvider user={user}>{children}</AuthProvider> : <LandingPage />}</body>
        </html>
    );
}
