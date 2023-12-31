import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import css from "./index.module.css";

export default function MembersList({ members, roomAdmin, isAdmin }) {
    return (
        <>
            {roomAdmin && (
                <div className={css["member-container"]}>
                    <UserBox user={roomAdmin} tag="Admin" />
                </div>
            )}
            {isAdmin &&
                members
                    .filter((member) => !member.accepted)
                    .map((member) => (
                        <div className={css["member-container"]} key={member.id}>
                            <UserBox user={member} />
                            <AsyncButton
                                className={css.accept}
                                mainAction={() => updateRoomMembership(room.id, member.id, true)}
                                content="Accept"
                                loadingContent="Accepting..."
                            />
                            <AsyncButton
                                className={css.reject}
                                mainAction={() => deleteRoomMembership(room.id, member.id)}
                                content="Reject"
                                loadingContent="Rejecting..."
                            />
                        </div>
                    ))}
            {members
                .filter((member) => member.accepted)
                .map((member) => (
                    <div className={css["member-container"]} key={member.id}>
                        <UserBox user={member} />
                        {isAdmin && member.id !== roomAdmin?.id && (
                            <AsyncButton
                                className={css.kick}
                                mainAction={() => deleteRoomMembership(room.id, member.id)}
                                content="Kick"
                                loadingContent="Kicking..."
                            />
                        )}
                    </div>
                ))}
        </>
    );
}
