import { getRooms } from "@/actions/rooms";
import NavLink from "@/components/general/NavLink";
import cssNavbar from "../index.module.css";
import cssNavbarRooms from "./index.module.css";

export default async function NavbarRooms() {
    const rooms = await getRooms();

    return (
        <nav className={cssNavbar.container}>
            <div className={cssNavbar["main-buttons"]}>
                <NavLink className={cssNavbar["main-button"]} activeClassName={cssNavbar.active} href="/rooms/new">
                    Create New Room
                </NavLink>
            </div>
            {rooms && (
                <div className={cssNavbar["list-wrapper"]}>
                    <div className={cssNavbar.list}>
                        {rooms.map((room) => (
                            <NavLink
                                className={cssNavbarRooms.link}
                                activeClassName={cssNavbarRooms.active}
                                key={room.id}
                                href={"/rooms/" + room.id}
                            >
                                {room.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
