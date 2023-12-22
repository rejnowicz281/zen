import { signOut } from "@/actions/auth";
import { getMessages } from "@/actions/messages";
import Greetings from "./components/Greetings";
import Messages from "./components/Messages";

export default async function Dashboard() {
    const messages = await getMessages();

    return (
        <div>
            <Greetings />
            <form action={signOut}>
                <button>Logout</button>
            </form>
            <Messages messages={messages} />
        </div>
    );
}
