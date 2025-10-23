import { Link } from "react-router-dom";
import {NavLink} from "react-router-dom";
export const PubNavBar = () => {
  const navItems = [
    { name: "home", link: "/" },
    { name: "features", link: "/features" },
    { name: "pricing", link: "/pricing" },
  ];

  return (
    <nav className="fixed p-8 text-2xl z-50">
      <div className="flex space-x-4 w-fit border-2 border-black shadow-2xl items-center bg-gray-100 m-0 rounded-full p-3 backdrop-blur-md bg-opacity-50">
        <div>LOGO</div>
        <ul className="flex space-x-4">
          {navItems.map((link) => (
            <NavLink className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-black"}
             key={link.name} to= {link.link}>{link.name}</NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
};
