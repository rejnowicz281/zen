import { getUserInfo } from "@/actions/users";
import DeleteUserButton from "@/components/auth/DeleteUserButton";
import UserBox from "@/components/general/UserBox";
import Link from "next/link";
import css from "./page.module.css";

export default async function UserPage({ params: { id } }) {
    const userInfo = await getUserInfo(id);

    if (userInfo.error)
        return (
            <div className={css["error-container"]}>
                An error occured while fetching this user's information. Are you sure the ID is correct? 🤔
            </div>
        );

    return (
        <div className={css.container}>
            <div className={css["user-wrapper"]}>
                <UserBox user={userInfo} />
            </div>
            <DeleteUserButton id={id} />
            <h2 className={css.heading}>User Rooms</h2>
            {userInfo.adminRooms.length > 0 || userInfo.memberRooms.length > 0 ? (
                <>
                    <div className={css["room-list-wrapper"]}>
                        <div className={css["room-list"]}>
                            {userInfo.adminRooms.map((room) => (
                                <Link key={room.id} className={css["room-link"]} href={`/rooms/${room.id}`}>
                                    <div className={css["room-link-name"]}>{room.name}</div>
                                    <div className={css["room-link-admin"]}>Admin</div>
                                </Link>
                            ))}
                            {userInfo.memberRooms.map((room) => (
                                <Link key={room.id} className={css["room-link"]} href={`/rooms/${room.id}`}>
                                    <div className={css["room-link-name"]}>{room.name}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={css["no-rooms"]}>This user is not in any rooms.</div>
            )}
        </div>
    );
}
