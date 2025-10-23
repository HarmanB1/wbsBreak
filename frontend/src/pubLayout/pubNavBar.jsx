import { Link } from "react-router-dom";
export const PubNavBar = () => {
  const navItems = [
    { name: "home", link: "/" },
    { name: "features", link: "/features" },
    { name: "pricing", link: "/pricing" },
  ];

  return (
    <nav className="fixed p-8 text-3xl z-50">
      <div className="flex space-x-4 w-fit border-2 border-black shadow-2xl items-center bg-gray-100 m-0 rounded-full p-3 backdrop-blur-md bg-opacity-50">
        <div>LOGO</div>
        <ul className="flex space-x-4">
          {navItems.map((link) => (
            <Link key={link.name} to= {link.link}>{link.name}</Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};
