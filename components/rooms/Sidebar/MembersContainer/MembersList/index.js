import { deleteRoomMembership, updateRoomMembership } from "@/actions/rooms";
import AsyncButton from "@/components/general/AsyncButton";
import UserBox from "@/components/general/UserBox";
import css from "./index.module.css";

export default function MembersList({ members, roomId, isAdmin, adminId }) {
    const sortedMembers = members.sort((a, b) => {
        if (a.id === adminId) {
            return -1; // Admin should always come first
        }
        if (!a.accepted && b.accepted) {
            return -1; // Non-accepted users should come second
        }
        if (a.accepted && !b.accepted) {
            return 1; // Accepted users should come last
        }
        return 0; // Maintain the original order for other cases
    });

    return sortedMembers.map((member) => (
        <div className={css["member-container"]} key={member.id}>
            <UserBox user={member} tag={member.id === adminId ? "Admin" : null} />
            {isAdmin && member.id !== adminId && member.accepted && (
                <AsyncButton
                    className={css.kick}
                    mainAction={() => deleteRoomMembership(roomId, member.id)}
                    content="Kick"
                    loadingContent="Kicking..."
                />
            )}
            {!member.accepted && isAdmin && member.id !== adminId && (
                <AsyncButton
                    className={css.accept}
                    mainAction={() => updateRoomMembership(roomId, member.id, true)}
                    content="Accept"
                    loadingContent="Accepting..."
                />
            )}
            {!member.accepted && isAdmin && member.id !== adminId && (
                <AsyncButton
                    className={css.reject}
                    mainAction={() => deleteRoomMembership(roomId, member.id)}
                    content="Reject"
                    loadingContent="Rejecting..."
                />
            )}
        </div>
    ));
}
