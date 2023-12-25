import { getUserInfo } from "@/actions/users";
import Link from "next/link";

export default async function UserPage({ params: { id } }) {
    const userInfo = await getUserInfo(id);

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>{userInfo.username || userInfo.email}</h1>
            <h2>Admin rooms</h2>
            <ul>
                {userInfo.adminRooms.map((room) => (
                    <li key={room.id}>
                        <Link href={`/rooms/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
            <h2>Member rooms</h2>
            <ul>
                {userInfo.memberRooms.map((room) => (
                    <li key={room.id}>
                        <Link href={`/rooms/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
