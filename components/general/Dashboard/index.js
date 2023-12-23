import { signOut } from "@/actions/auth";
import { getRooms } from "@/actions/rooms";
import CreateRoom from "@/components/rooms/CreateRoom";
import Link from "next/link";
import Greetings from "../Greetings";

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
                <li>
                    <Link href="/rooms/public">Public</Link>
                </li>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <Link href={`/rooms/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
