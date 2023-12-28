import Image from "next/image";
import Link from "next/link";
import css from "./index.module.css";

export default function UserBox({ user, adminTag }) {
    return (
        <div className={css.box}>
            <Image height={50} width={50} src={user.avatar_url} alt="?" />
            <Link href={"/users/" + user.id}>
                {user.display_name} {adminTag && "(Admin)"}
            </Link>
        </div>
    );
}
