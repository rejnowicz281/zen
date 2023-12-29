import { getUserInfo } from "@/actions/users";
import UserBox from "@/components/general/UserBox";
import Link from "next/link";
import css from "./page.module.css";

export default async function UserPage({ params: { id } }) {
    const userInfo = await getUserInfo(id);

    return (
        <div className={css.container}>
            <div className={css["user-wrapper"]}>
                <UserBox user={userInfo} />
            </div>
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
