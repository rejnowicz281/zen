"use client";

import { deleteMessage } from "@/actions/messages";
import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import formatMessageDate from "@/utils/general/formatMessageDate";
import { useEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import css from "./index.module.css";

export default function MessagesList({ messages, isAdmin, isAccepted, roomIsPublic, deleteOptimisticMessage }) {
    const { user } = useAuthContext();

    const messagesRef = useRef(null);
    const previousMessageCount = useRef(0);

    useEffect(() => {
        if (messages && messagesRef.current) {
            const container = messagesRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added
            if (currentMessageCount > previousMessageCount.current) {
                const lastMessage = container.lastChild;
                lastMessage.scrollIntoView({ behavior: "smooth" });
            }

            previousMessageCount.current = currentMessageCount;
        }
    }, [messages]);

    return (
        <div className={css.wrapper}>
            <div ref={messagesRef} className={css.container}>
                {roomIsPublic || isAccepted || isAdmin ? (
                    messages.length > 0 ? (
                        messages.map((message) => (
                            <div className={css.message} key={message.id}>
                                <div className={css["message-top"]}>
                                    <UserBox user={message.user} />
                                    {message.created_at && (
                                        <div className={css["message-date"]}>
                                            {formatMessageDate(message.created_at)}
                                        </div>
                                    )}
                                </div>
                                {message.loading ? (
                                    <div className={css["message-loading"]}>
                                        Message is being sent...{" "}
                                        <AiOutlineLoading className={css["message-loading-spin"]} />
                                    </div>
                                ) : (
                                    !message.deleted &&
                                    (isAdmin || message.user.id === user.id) && (
                                        <form
                                            action={(formData) => {
                                                const id = formData.get("id");
                                                if (!id) return;

                                                deleteOptimisticMessage(id);
                                                deleteMessage(id);
                                            }}
                                        >
                                            <input type="hidden" name="id" value={message.id} />
                                            <button type="submit" className={css.delete}>
                                                Delete Message
                                            </button>
                                        </form>
                                    )
                                )}
                                <div className={css.content}>
                                    {message.deleted ? (
                                        <div>This message was deleted.</div>
                                    ) : (
                                        <>
                                            <div>{message.text}</div>
                                            {message.image_url && <img className={css.image} src={message.image_url} />}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={css["no-messages"]}>
                            <p>There are no messages in this room.</p>
                        </div>
                    )
                ) : (
                    <div className={css["not-accepted"]}>
                        <p>You need to be an accepted member to see the messages of this room.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
