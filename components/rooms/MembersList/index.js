export default function MembersList({ members }) {
    return (
        <ul>
            {members.map((member) => (
                <li key={member.id}>{member.email}</li>
            ))}
        </ul>
    );
}
