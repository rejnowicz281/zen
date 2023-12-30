"use client";

import UserBox from "@/components/general/UserBox";
import NavbarLogout from "@/components/navbars/NavbarLogout";
import NavbarUsers from "@/components/navbars/NavbarUsers";
import useAuthContext from "@/providers/AuthProvider";
import removeDuplicates from "@/utils/general/removeDuplicates";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import css from "./index.module.css";

export default function MainSidebar({ NavbarRooms }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClientComponentClient();
    const { user } = useAuthContext();
    const [currentNavbar, setCurrentNavbar] = useState("rooms");
    const [loggedUsers, setLoggedUsers] = useState([]);
    const [presenceEnabled, setPresenceEnabled] = useState(true);

    function toggleSidebar() {
        setOpen(!open);
    }

    useEffect(() => {
        const presenceChannel = supabase.channel("presence#public");

        presenceChannel
            .on("presence", { event: "sync" }, () => {
                const newState = presenceChannel.presenceState();
                console.log("sync", newState);
                const newStateArray = Object.values(newState).map((arr) => arr[0]);
                const pushArray = removeDuplicates(newStateArray);
                setLoggedUsers(pushArray);
            })
            .subscribe(async (status) => {
                if (status !== "SUBSCRIBED") {
                    return;
                }

                if (presenceEnabled) {
                    const presenceTrackStatus = await presenceChannel.track(user);
                    console.log("Presence Track Status -", presenceTrackStatus);
                }
            });

        return () => {
            presenceChannel.unsubscribe();
            presenceChannel.untrack();
        };
    }, [supabase, router, presenceEnabled]);

    useEffect(() => {
        // Close sidebar when navigating to a new page
        setOpen(false);
    }, [pathname]);

    function togglePresence() {
        setPresenceEnabled(!presenceEnabled);
    }

    return (
        <>
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
                        Active Users ({loggedUsers.length})
                    </button>
                    <button
                        id={currentNavbar == "logout" ? css["active-button"] : undefined}
                        onClick={() => setCurrentNavbar("logout")}
                        type="button"
                    >
                        Logout
                    </button>
                </div>
                {currentNavbar === "rooms" ? (
                    NavbarRooms
                ) : currentNavbar === "users" ? (
                    <NavbarUsers
                        loggedUsers={loggedUsers}
                        togglePresence={togglePresence}
                        presenceEnabled={presenceEnabled}
                    />
                ) : (
                    <NavbarLogout />
                )}
            </aside>
        </>
    );
}
