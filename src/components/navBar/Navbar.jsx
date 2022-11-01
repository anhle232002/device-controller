import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const isCurrentPage = (path) => location.pathname === path;
    return (
        <div className="sticky  text-custom-white">
            <ul className="grid items-center grid-cols-4 text-center">
                <Link className="bg-custom-gray p-3" to={"/bluetooth"}>
                    Bluetooth
                </Link>
                <Link className="bg-custom-gray p-3" to={"/audio"}>
                    Audio
                </Link>
                <Link className="bg-custom-gray p-3" to={"/wireless"}>
                    Wireless
                </Link>
                <Link className="bg-custom-gray p-3" to={"/screen"}>
                    Screen
                </Link>
            </ul>
        </div>
    );
}

export default Navbar;
