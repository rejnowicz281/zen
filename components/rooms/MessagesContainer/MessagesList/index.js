"use client";

import { deleteMessage } from "@/actions/messages";
import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import useAuthContext from "@/providers/AuthProvider";
import css from "./index.module.css";

export default function MessagesList({ messages, isAdmin }) {
    const { user } = useAuthContext();

    return (
        <div className={css.container}>
            {messages.map((message) => (
                <div className={css.message} key={message.id}>
                    <UserBox user={message.user} />
                    {!message.deleted && (isAdmin || message.user.id === user.id) && (
                        <AsyncButton
                            className={css.delete}
                            mainAction={() => deleteMessage(message.id)}
                            content="Delete Message"
                            loadingContent="Deleting..."
                        />
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
            ))}
        </div>
    );
}
