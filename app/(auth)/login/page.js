import { githubSignIn } from "@/actions/auth";

export default async function Login() {
    return (
        <form action={githubSignIn}>
            <button>Sign In With Github</button>
        </form>
    );
}
