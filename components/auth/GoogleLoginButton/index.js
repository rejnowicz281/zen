import { googleSignIn } from "@/actions/auth";
import SubmitButton from "@/components/general/SubmitButton";
import { FcGoogle } from "react-icons/fc";
import css from "./index.module.css";

export default function GoogleLoginButton() {
    return (
        <form action={googleSignIn}>
            <SubmitButton
                className={css.button}
                content={
                    <>
                        <FcGoogle className={css.icon} />
                        Login With Google
                    </>
                }
                loading={
                    <>
                        <FcGoogle className={css.icon} />
                        Logging in...
                    </>
                }
            />
        </form>
    );
}
