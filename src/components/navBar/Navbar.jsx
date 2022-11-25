import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const links = [
    { path: "/bluetooth", title: "Bluetooth", icon: <i class="ri-bluetooth-fill"></i> },
    { path: "/audio", title: "Audio", icon: <i class="ri-sound-module-fill"></i> },
    { path: "/wifi", title: "Wifi", icon: <i class="ri-wifi-fill"></i> },
    { path: "/screen", title: "Screen", icon: <i class="ri-bluetooth-fill"></i> },
];

function Navbar() {
    const location = useLocation();
    const isCurrentPage = (path) => location.pathname === path;

    return (
        <div className="sticky top-0 text-custom-white w-full z-50">
            <ul className="grid items-center grid-cols-4 text-center">
                {links.map((link) => {
                    return (
                        <NavLink
                            key={link.path}
                            path={link.path}
                            title={link.title}
                            icon={link.icon}
                            isActive={isCurrentPage(link.path)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;

const NavLink = ({ title, path, isActive, icon }) => {
    return (
        <Link
            to={path}
            className={`bg-custom-gray p-3 hover:bg-custom-black duration-100 overflow-hidden
            ${isActive && "bg-custom-black"} `}
        >
            {isActive ? <span className="text-xl">{icon}</span> : <span>{title}</span>}
        </Link>
    );
};
