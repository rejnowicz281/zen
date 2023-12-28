import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, roomId, isAdmin, isAccepted, roomIsPublic }) {
    return (
        <div className={css.container}>
            {(roomIsPublic || isAccepted || isAdmin) && <MessagesList messages={messages} isAdmin={isAdmin} />}
            {(isAdmin || isAccepted) && <CreateMessage roomId={roomId} />}
        </div>
    );
}
