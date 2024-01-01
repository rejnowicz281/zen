"use client";

import { useEffect, useOptimistic, useTransition } from "react";
import CreateMessage from "./CreateMessage";
import MessagesList from "./MessagesList";
import css from "./index.module.css";

export default function MessagesContainer({ messages, roomId, isAdmin, isAccepted, roomIsPublic }) {
    const [isPending, startTransition] = useTransition();
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

    useEffect(() => {
        // Ensure that the optimistic messages are always up to date
        startTransition(() => setOptimisticMessages(messages));
    }, [messages]);

    function addOptimisticMessage(message) {
        setOptimisticMessages([...optimisticMessages, message]);
    }

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <MessagesList
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
