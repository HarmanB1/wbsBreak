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
    { to: "/login", label: "Login" },
  ];


  const profLinks = [
    { to: "/Profile", label: "Profile" },
    { to: "/Setting", label: "Settings" },
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
      {/* Main Navigation Bar */}
      <nav className="relative flex bg-orange-50 dark:bg-orange-50 px-6 py-4 items-center h-16 border-b border-orange-200 shadow-sm">
        {/* Logo - Desktop */}
        <div className="hidden sm:flex items-center font-bold text-xl text-orange-800 tracking-tight">
          LOGO
        </div>

        {/* Logo - Mobile */}
        <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2 font-bold text-orange-800">
          LOGO
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex space-x-8 ml-12">
          {Links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 transition-all duration-300 font-medium rounded-lg hover:bg-orange-100 ${
                    isActive
                      ? "text-orange-700 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-orange-500"
                      : "text-orange-600"
                  }`
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
            className="rounded-full w-10 h-10 bg-orange-200 border-2 border-orange-300 hover:bg-orange-300 hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center font-medium text-orange-700 shadow-sm"
            aria-label="User menu"
          >
            SS
          </button>

          {/* Profile Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-56 rounded-xl shadow-lg bg-white border border-orange-200 py-2 z-50 transition-all duration-300 ${
              profMod
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="px-4 py-2 border-b border-orange-100">
              <p className="text-sm font-medium text-orange-800">
                Welcome back!
              </p>
            </div>
            <ul className="py-1">
              {profLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block px-4 py-3 mx-2 rounded-lg transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-orange-100 text-orange-700"
                          : "text-orange-600 hover:bg-orange-50 hover:text-orange-800"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden absolute left-4" ref={menuRef}>
          <button
            onClick={() => setUserMod(!userMod)}
            className="focus:outline-none relative flex items-center justify-center rounded-lg p-2 text-orange-700 hover:bg-orange-100 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-all duration-200"
            aria-label="Mobile menu"
          >
            {userMod ? (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
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

      {/* Mobile Menu Overlay */}
      {userMod && (
        <div className="sm:hidden fixed inset-0 top-16 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white border-b border-orange-200 shadow-xl">
            <div className="px-6 py-4 space-y-3">
              {/* Navigation Links */}
              {Links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setUserMod(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                        : "text-orange-600 hover:bg-orange-50 hover:text-orange-800"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="border-t border-orange-200 my-3"></div>

              {/* Profile Links */}
              {profLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setUserMod(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                        : "text-orange-600 hover:bg-orange-50 hover:text-orange-800"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
