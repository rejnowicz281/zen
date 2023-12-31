import Image from "next/image";
import Link from "next/link";
import css from "./index.module.css";

export default function UserBox({ user, tag = null }) {
    return (
        <Link href={"/users/" + user.id} className={css.box}>
            <Image height={50} width={50} src={user.avatar_url} alt="?" />
            {user.display_name} {tag && `(${tag})`}
        </Link>
    );
}
