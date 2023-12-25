"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function githubSignIn() {
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect(data.url);
}

export async function googleSignIn() {
    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect(data.url);
}

export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return redirect("/login");
}
