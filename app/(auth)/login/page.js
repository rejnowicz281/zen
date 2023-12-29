import { githubSignIn, googleSignIn } from "@/actions/auth";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import css from "./page.module.css";

export default function LoginPage() {
    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <h1 className={css.heading}>zen</h1>
                <form action={githubSignIn}>
                    <button className={css.github}>
                        <BsGithub className={css.icon} /> Continue With Github
                    </button>
                </form>
                <form action={googleSignIn}>
                    <button className={css.google}>
                        <FcGoogle className={css.icon} />
                        Continue With Google
                    </button>
                </form>
            </div>
        </div>
    );
}
