import { signOut } from "@/actions/auth";
import cssNavbar from "../index.module.css";

export default function NavbarLogout() {
    return (
        <form action={signOut} className={cssNavbar.container}>
            <button className={cssNavbar["main-button"]}>Logout</button>
        </form>
    );
}
