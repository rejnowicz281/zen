import usePresenceContext from "@/providers/PresenceProvider";
import MembersList from "./MembersList";
import css from "./index.module.css";

export default function MembersContainer({ members, roomId, isAdmin, isAccepted, roomAdmin }) {
    const { loggedUsers } = usePresenceContext();

    const onlineMembers = isAdmin || isAccepted ? members.filter((user) => loggedUsers.includes(user.id)) : [];

    const offlineMembers = isAdmin || isAccepted ? members.filter((user) => !loggedUsers.includes(user.id)) : [];

    if (roomAdmin)
        if (loggedUsers.includes(roomAdmin.id)) onlineMembers.unshift(roomAdmin);
        else offlineMembers.unshift(roomAdmin);

    return (
        <div className={css.members}>
            {onlineMembers.length > 0 && (
                <>
                    <h5 className={css["members-heading"]}>
                        Online Members{(isAdmin || isAccepted) && ` (${onlineMembers.length})`}
                    </h5>
                    <MembersList
                        roomId={roomId}
                        members={onlineMembers}
                        isAdmin={isAdmin}
                        adminId={roomAdmin ? roomAdmin.id : null}
                    />
                </>
            )}
            {offlineMembers.length > 0 && (
                <>
                    <h5 className={css["members-heading"]}>Offline Members</h5>
                    <MembersList
                        roomId={roomId}
                        members={offlineMembers}
                        isAdmin={isAdmin}
                        adminId={roomAdmin ? roomAdmin.id : null}
                    />
                </>
            )}
            {!isAdmin && !isAccepted && (
                <p className={css["not-accepted"]}>
                    You need to be an accepted member to see all members of this room.
                </p>
            )}
        </div>
    );
}
