import { githubSignIn } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import { BsGithub } from "react-icons/bs";
import css from "./index.module.css";

export default function GithubLoginButton() {
    return (
        <form action={githubSignIn}>
            <SubmitButton
                className={css.button}
                content={
                    <>
                        <BsGithub className={css.icon} />
                        Login With Github
                    </>
                }
                loading={
                    <>
                        <BsGithub className={css.icon} />
                        Logging in...
                    </>
                }
            />
        </form>
    );
}
