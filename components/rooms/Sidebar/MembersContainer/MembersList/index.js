import { deleteRoomMembership, updateRoomMembership } from "@/actions/rooms";
import SubmitButton from "@/components/general/SubmitButton";
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
                <form action={deleteRoomMembership}>
                    <input type="hidden" name="user_id" value={member.id} />
                    <input type="hidden" name="room_id" value={roomId} />
                    <SubmitButton className={css.kick} content="Kick" loading="Kicking..." />
                </form>
            )}
            {!member.accepted && isAdmin && member.id !== adminId && (
                <form action={updateRoomMembership}>
                    <input type="hidden" name="user_id" value={member.id} />
                    <input type="hidden" name="room_id" value={roomId} />
                    <input type="hidden" name="accepted" value={true} />
                    <SubmitButton className={css.accept} content="Accept" loading="Accepting..." />
                </form>
            )}
            {!member.accepted && isAdmin && member.id !== adminId && (
                <form action={deleteRoomMembership}>
                    <input type="hidden" name="user_id" value={member.id} />
                    <input type="hidden" name="room_id" value={roomId} />
                    <SubmitButton className={css.reject} content="Reject" loading="Rejecting..." />
                </form>
            )}
        </div>
    ));
}
