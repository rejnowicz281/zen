import { signOut } from "@/actions/auth";
import cssNavbar from "../index.module.css";

export default function NavbarLogout() {
    return (
        <form action={signOut} className={cssNavbar.container}>
            <div className={cssNavbar["main-buttons"]}>
                <button className={cssNavbar["main-button"]}>Logout</button>
            </div>
        </form>
    );
}
