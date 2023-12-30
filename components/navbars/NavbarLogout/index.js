import { signOut } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import cssNavbar from "../index.module.css";

export default function NavbarLogout() {
    return (
        <form action={signOut} className={cssNavbar.container}>
            <div className={cssNavbar["main-buttons"]}>
                <SubmitButton className={cssNavbar["main-button"]} content="Logout" loading="Logging out..." />
            </div>
        </form>
    );
}
