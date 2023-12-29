import CreateRoom from "@/components/rooms/CreateRoom";
import css from "./page.module.css";

export default function NewRoomPage() {
    return (
        <div className={css.container}>
            <h1 className={css.heading}>New Room</h1>
            <CreateRoom />
        </div>
    );
}
