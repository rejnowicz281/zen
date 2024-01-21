import { VscLoading } from "react-icons/vsc";
import css from "./index.module.css";

export default function Loading({ spinnerSize = "50px" }) {
    return (
        <div className={css.wrapper}>
            <VscLoading style={{ fontSize: spinnerSize }} className={css.spinner} />
        </div>
    );
}
