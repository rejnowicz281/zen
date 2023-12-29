import ProfileLink from "@/components/general/ProfileLink";
import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>Welcome to zen.</h1>
            <li className={css["link-wrapper"]}>
                <Link href="/rooms/new">Create a room</Link>
            </li>
            <li className={css["link-wrapper"]}>
                <Link href="/users">See all users</Link>
            </li>
            <li className={css["link-wrapper"]}>
                <ProfileLink />
            </li>
        </div>
    );
}
