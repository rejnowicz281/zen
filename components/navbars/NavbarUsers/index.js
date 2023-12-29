"use client";

import UserBox from "@/components/general/UserBox";
import cssNavbar from "../index.module.css";
import cssNavbarUsers from "./index.module.css";

export default function NavbarUsers({ loggedUsers, togglePresence, presenceEnabled }) {
    return (
        <nav className={cssNavbar.container}>
            <button className={cssNavbar["main-button"]} onClick={togglePresence}>
                {presenceEnabled ? "Disable Presence" : "Enable Presence"}
            </button>
            <div className={cssNavbar["list-wrapper"]}>
                <div className={cssNavbar.list}>
                    {loggedUsers.map((user) => (
                        <div className={cssNavbarUsers["user-wrapper"]} key={user.id}>
                            <UserBox user={user} />
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
