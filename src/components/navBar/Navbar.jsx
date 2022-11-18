import { Link, useLocation } from "react-router-dom";

const links = [
    { path: "/bluetooth", title: "Bluetooth" },
    { path: "/audio", title: "Audio" },
    { path: "/wireless", title: "Wireless" },
    { path: "/screen", title: "Screen" },
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
                            isActive={isCurrentPage(link.path)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;

const NavLink = ({ title, path, isActive }) => {
    return (
        <Link
            to={path}
            className={`bg-custom-gray p-3 hover:bg-custom-black duration-100 
            ${isActive && "bg-custom-black"} `}
        >
            {title}
        </Link>
    );
};
