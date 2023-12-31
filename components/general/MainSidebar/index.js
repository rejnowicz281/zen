"use client";

import UserBox from "@/components/general/UserBox";
import NavbarLogout from "@/components/navbars/NavbarLogout";
import useAuthContext from "@/providers/AuthProvider";
import { PresenceProvider } from "@/providers/PresenceProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import css from "./index.module.css";

export default function MainSidebar({ NavbarRooms, NavbarUsers }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user } = useAuthContext();
    const [currentNavbar, setCurrentNavbar] = useState("rooms");

    useEffect(() => {
        // Close sidebar when navigating to a new page
        setOpen(false);
    }, [pathname]);

    function toggleSidebar() {
        setOpen(!open);
    }

    return (
        <PresenceProvider>
            <button onClick={toggleSidebar} className={css.toggle} type="button">
                <HiMiniBars3BottomLeft />
            </button>
            <aside className={`${css.container}${open ? ` ${css.open}` : ""}`}>
                <div className={css["current-user-wrapper"]}>
                    <UserBox user={user} />
                </div>
                <div className={css.buttons}>
                    <button
                        id={currentNavbar == "rooms" ? css["active-button"] : undefined}
                        onClick={() => setCurrentNavbar("rooms")}
                        type="button"
                    >
                        Rooms
                    </button>
                    <button
                        id={currentNavbar == "users" ? css["active-button"] : undefined}
                        onClick={() => setCurrentNavbar("users")}
                        type="button"
                    >
                        Users
                    </button>
                    <button
                        id={currentNavbar == "logout" ? css["active-button"] : undefined}
                        onClick={() => setCurrentNavbar("logout")}
                        type="button"
                    >
                        Logout
                    </button>
                </div>
                {currentNavbar === "rooms" ? NavbarRooms : currentNavbar === "users" ? NavbarUsers : <NavbarLogout />}
            </aside>
        </PresenceProvider>
    );
}
