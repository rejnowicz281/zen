import { signOut } from "@/actions/auth";
import { getRooms } from "@/actions/rooms";
import Link from "next/link";
import CreateRoom from "./components/CreateRoom";
import Greetings from "./components/Greetings";

export default async function Dashboard() {
    const rooms = await getRooms();

    return (
        <div>
            <Greetings />
            <form action={signOut}>
                <button>Logout</button>
            </form>
            <CreateRoom />
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <Link href={`/rooms/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
