import { NavLink } from "react-router";
import { useState, useEffect, useRef } from "react";

export const PubNav = () => {
  const [profMod, setProfMod] = useState(false);
  const [userMod, setUserMod] = useState(false);

  const profileRef = useRef(null);
  const menuRef = useRef(null);

  const Links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/login", label: "Login" },
    
  ];

  const profLinks = [
    { to: "/Profile", label: "Profile" },
    { to: "/Setting", label: "Setting" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setUserMod(false);
        setProfMod(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOut = (e) => {
      if (
        (profileRef.current && !profileRef.current.contains(e.target)) ||
        (menuRef.current && !menuRef.current.contains(e.target))
      ) {
        setProfMod(false);
        setUserMod(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, []);

  return (
    <>
      <nav className="relative flex bg-orange-100 text-orange-700 p-4 gap-x-3 items-center h-16">
        {/* Logo */}
        <div className="hidden sm:flex items-center font-bold text-xl">
          LOGO
        </div>
        <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2 font-bold text-xl">
          LOGO
        </div>

        {/* Desktop Links */}
        <ul className="hidden sm:flex space-x-6 ml-10">
          {Links.map(({ to, label }) => (
            <li key={to} className="hover:text-orange-500  ">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? "text-orange-700 font-semibold" : undefined
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Menu */}
        <div className="sm:block ml-auto relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfMod((prev) => {
                if (!prev) setUserMod(false);
                return !prev;
              });
            }}
            className="rounded-full border-2 border-transparent hover:bg-orange-200 focus:outline-none p-2"
            aria-label="User-menu"
          >
            ss
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-orange-50 text-orange-700 py-1 z-50 transition-all duration-400 origin-right pl-4 ${
              profMod
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <ul>
              {profLinks.map(({ to, label }) => (
                <li key={to} className="hover:text-orange-500">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive ? "text-orange-700 font-semibold" : undefined
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile menu button */}
        <div
          className="sm:hidden absolute left-0 flex items-center justify-between"
          ref={menuRef}
        >
          <button
            onClick={() => setUserMod(!userMod)}
            className="focus:outline-none relative items-center justify-center rounded-md p-2 text-orange-700 hover:bg-orange-200 hover:text-orange-900 focus:ring-2 focus:ring-orange-300 focus:ring-inset"
            aria-label="mobile menu button"
          >
            {userMod ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {userMod && (
        <div
          className={`sm:hidden absolute top-16 left-0 w-full backdrop-blur-sm shadow-md bg-orange-50 bg-opacity-90 text-orange-700 px-4 py-2 space-y-2 transition-all duration-300 ease-out origin-top transform ${
            userMod
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-10 pointer-events-none"
          }`}
        >
          {Links.map(({ to, label }, index) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setUserMod(false)}
              className={({ isActive }) =>
                `block px-2 py-1 rounded hover:bg-orange-200 opacity-0 translate-y-4 animate-fade-in-down animate-delay-${
                  index * 100
                } ${isActive ? "bg-orange-200 font-semibold" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}

          <hr className="border-orange-300" />

          {profLinks.map(({ to, label }, index) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setUserMod(false)}
              className={`block px-2 py-1 rounded hover:bg-orange-200 text-orange-700 opacity-0 translate-y-4 animate-fade-in-down animate-delay-${
                (Links.length + index) * 100
              }`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};
