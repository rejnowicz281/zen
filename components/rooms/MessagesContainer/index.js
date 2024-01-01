import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, roomId, isAdmin, isAccepted, roomIsPublic }) {
    return (
        <div className={css.container}>
            <MessagesList messages={messages} isAdmin={isAdmin} isAccepted={isAccepted} roomIsPublic={roomIsPublic} />
            {(isAdmin || isAccepted) && <CreateMessage roomId={roomId} />}
        </div>
    );
}
