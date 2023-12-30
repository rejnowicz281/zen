import DemoLoginButton from "@/components/auth/DemoLoginButton";
import GithubLoginButton from "@/components/auth/GithubLoginButton";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import css from "./layout.module.css";

export default function AuthLayout({ children }) {
    return (
        <div className={css.wrapper}>
            <div className={css.left}>
                <h1 className={css.heading}>zen</h1>
                <div className={css["oauth-buttons"]}>
                    <DemoLoginButton />
                    <GithubLoginButton />
                    <GoogleLoginButton />
                </div>
            </div>
            {children}
        </div>
    );
}
