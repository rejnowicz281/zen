"use client";

import NavLink from "@/components/general/NavLink";
import UserBox from "@/components/general/UserBox";
import cssNavbar from "../index.module.css";
import cssNavbarUsers from "./index.module.css";

export default function NavbarUsers({ loggedUsers, togglePresence, presenceEnabled }) {
    return (
        <nav className={cssNavbar.container}>
            <div className={cssNavbar["main-buttons"]}>
                <NavLink className={cssNavbar["main-button"]} activeClassName={cssNavbar.active} href="/users">
                    See All Users
                </NavLink>
                <button className={cssNavbar["main-button"]} onClick={togglePresence}>
                    {presenceEnabled ? "Disable Presence" : "Enable Presence"}
                </button>
            </div>
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
