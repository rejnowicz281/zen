import { getRandomRoomId } from "@/actions/rooms";
import Link from "next/link";
import css from "./page.module.css";

export default async function Home() {
    const randomRoomId = await getRandomRoomId();

    return (
        <div className={css.container}>
            <h1 className={css.heading}>Welcome to zen.</h1>
            <li className={css["list-item-wrapper"]}>
                {randomRoomId ? <Link href={`/rooms/${randomRoomId}`}>Have Fun!</Link> : "Have Fun!"}
            </li>
        </div>
    );
}
