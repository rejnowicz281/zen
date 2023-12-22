"use client";

import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children, user }) {
    return (
        <AuthContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used within a AuthContext Provider");

    return context;
}
