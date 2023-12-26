"use client";

import { deleteMessage } from "@/actions/messages";
import useAuthContext from "@/providers/AuthProvider";

export default function Messages({ messages, isAdmin }) {
    const { user } = useAuthContext();

    return (
        <ul>
            {messages.map((message) => (
                <li key={message.id}>
                    <b>{message.user.display_name}: </b>
                    {!message.deleted && (isAdmin || message.user.id === user.id) && (
                        <button onClick={() => deleteMessage(message.id)}>Delete</button>
                    )}
                    <p>{message.deleted ? "This message was deleted." : message.text}</p>
                </li>
            ))}
        </ul>
    );
}
