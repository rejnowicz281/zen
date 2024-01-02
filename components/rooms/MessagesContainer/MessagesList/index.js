"use client";

import { deleteMessage } from "@/actions/messages";
import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import useModalContext from "@/providers/ModalContext";
import formatMessageDate from "@/utils/general/formatMessageDate";
import { useEffect, useRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import ModalImage from "./ModalImage";
import css from "./index.module.css";

export default function MessagesList({ messages, isAdmin, isAccepted, roomIsPublic }) {
    const { user } = useAuthContext();
    const { setModal } = useModalContext();

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
                                        <AsyncButton
                                            className={css.delete}
                                            mainAction={() => deleteMessage(message.id)}
                                            content="Delete Message"
                                            loadingContent="Deleting..."
                                        />
                                    )
                                )}
                                <div className={css.content}>
                                    {message.deleted ? (
                                        <div>This message was deleted.</div>
                                    ) : (
                                        <>
                                            <div>{message.text}</div>
                                            {message.image_url && (
                                                <img
                                                    onClick={() =>
                                                        setModal(
                                                            <ModalImage src={message.image_url} />,
                                                            css["modal-image"]
                                                        )
                                                    }
                                                    className={css.image}
                                                    src={message.image_url}
                                                />
                                            )}
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
