"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return redirect("/login?message=Invalid Email or Password");

    return redirect("/");
}

export async function signUp(formData) {
    const email = formData.get("email");
    const display_name = formData.get("username");
    const password = formData.get("password");
    const passwordConfirm = formData.get("password-confirm");
    const avatarFile = formData.get("avatar");

    const origin = headers().get("origin");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const bucket = supabase.storage.from("avatars");
    const fileName = `${Date.now()}`;

    const { data: avatar, avatarError } = await bucket.upload(fileName, avatarFile);

    if (avatarError) return actionError("signUp", { avatarError });

    const avatar_url = avatarFile.type.startsWith("image/")
        ? bucket.getPublicUrl(fileName).data.publicUrl
        : "https://phheiclhfyxvkfqpwmdn.supabase.co/storage/v1/object/public/avatars/default_avatar.jpg";

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: display_name,
                avatar_url,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) return redirect("/register?message=There was an error creating your account");

    return redirect("/");
}

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

export async function demoLogin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email: "demo@gmail.com",
        password: "123456",
    });

    if (error) return redirect("/login?message=Could not authenticate user");

    return redirect("/");
}

export async function signOut() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();

    return redirect("/login");
}
