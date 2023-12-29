import { getAllUsers } from "@/actions/users";
import UserBox from "@/components/general/UserBox";
import css from "./page.module.css";

export default async function UsersPage() {
    const users = await getAllUsers();

    return (
        <div className={css.container}>
            <h1 className={css.heading}>Users</h1>
            <div className={css["list-wrapper"]}>
                <div className={css.list}>
                    {users.map((user) => (
                        <div className={css.user} key={user.id}>
                            <UserBox user={user} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
