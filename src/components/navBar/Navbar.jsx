import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const links = [
    { path: "/bluetooth", title: "Bluetooth", icon: <i class="ri-bluetooth-fill"></i> },
    { path: "/wifi", title: "Wifi", icon: <i class="ri-wifi-fill"></i> },
    { path: "/audio", title: "Audio", icon: <i class="ri-sound-module-fill"></i> },
    { path: "/screen", title: "Screen", icon: <i class="ri-bluetooth-fill"></i> },
];

function Navbar() {
    const location = useLocation();
    const isCurrentPage = (path) => location.pathname === path;

    return (
        <div className="top-0 right-0 z-50 w-full py-3  center text-custom-white">
            <motion.ul className="grid items-center w-[65%] grid-cols-4 overflow-hidden text-center rounded-full shadow-lg">
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
            </motion.ul>
        </div>
    );
}

export default Navbar;

const NavLink = ({ title, path, isActive, icon }) => {
    return (
        <Link
            to={path}
            className={`bg-custom-light-black px-8 center py-3 h-full col-span-1 hover:bg-custom-gray duration-100 overflow-hidden
            ${isActive && "bg-custom-gray"} `}
        >
            {isActive ? (
                <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-xl"
                >
                    {icon}
                </motion.span>
            ) : (
                <span>{title}</span>
            )}
        </Link>
    );
};
