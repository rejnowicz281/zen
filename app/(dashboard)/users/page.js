import { getAllUsers } from "@/actions/users";
import Link from "next/link";
import css from "./page.module.css";

export default async function UsersPage() {
    const users = await getAllUsers();

    return (
        <div className={css.container}>
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
