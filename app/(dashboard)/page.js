import { signOut } from "@/actions/auth";
import { getRooms } from "@/actions/rooms";
import Greetings from "@/components/general/Greetings";
import CreateRoom from "@/components/rooms/CreateRoom";
import Link from "next/link";

export default async function Home() {
    const rooms = await getRooms();

    return (
        <div>
            <Greetings />
            <form action={signOut}>
                <button>Logout</button>
            </form>
            <Link href="/users">Users</Link>

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
