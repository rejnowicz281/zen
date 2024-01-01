import ProfileLink from "@/components/general/ProfileLink";
import css from "./page.module.css";

export default function Home() {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>Welcome to zen.</h1>
            <li className={css["link-wrapper"]}>
                <ProfileLink text="Have fun!" />
            </li>
        </div>
    );
}
