import { githubSignIn, googleSignIn } from "@/actions/auth";

export default function LoginPage() {
    return (
        <div>
            <h1>zen</h1>
            <form action={githubSignIn}>
                <button>Sign In With Github</button>
            </form>
            <form action={googleSignIn}>
                <button>Sign In With Google</button>
            </form>
        </div>
    );
}
