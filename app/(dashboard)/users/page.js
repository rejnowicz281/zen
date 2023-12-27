import { getAllUsers } from "@/actions/users";
import Link from "next/link";

export default async function UsersPage() {
    const users = await getAllUsers();

    return (
        <div>
            <Link href="/">Back</Link>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.display_name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
