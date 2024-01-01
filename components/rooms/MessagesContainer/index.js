"use client";

import { useEffect, useOptimistic, useTransition } from "react";
import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, roomId, isAdmin, isAccepted, roomIsPublic }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

    useEffect(() => {
        // Ensure that other user's messages are also updated
        startTransition(() => setOptimisticMessages(messages));
    }, [messages]);

    function addOptimisticMessage(message) {
        setOptimisticMessages([...optimisticMessages, message]);
    }

    function deleteOptimisticMessage(id) {
        setOptimisticMessages(optimisticMessages.filter((message) => message.id !== id));
    }

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <MessagesList
                    deleteOptimisticMessage={deleteOptimisticMessage}
                    messages={optimisticMessages}
                    isAdmin={isAdmin}
                    isAccepted={isAccepted}
                    roomIsPublic={roomIsPublic}
                />
                {(isAdmin || isAccepted) && (
                    <CreateMessage roomId={roomId} addOptimisticMessage={addOptimisticMessage} />
                )}
            </div>
        </div>
    );
}
