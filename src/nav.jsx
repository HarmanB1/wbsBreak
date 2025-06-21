import { NavLink} from "react-router";
import { useState } from "react";

export const Nav = ()=>{
    const [profMod, setProfMod] = useState(false);
    const [userMod, setUserMod] = useState(false);
    

    const Links = [
      { to: "/", label: "Home" },
      { to: "/project", label: "Projects" },
      { to: "/sprint", label: "Sprint" },
      { to: "/wbs", label: "WBS" },
      { to: "scrum", label: "Scrum" },
    ];

    const profLinks = [
      { to: "/Profile", label: "Profile" },
      { to: "/Setting", label: "Setting" },
    ];



    return (
      <>
        <nav className="relative flex bg-gray-800 dark:bg-gray-900 text-white  p-4 gap-x-3 items-center h-16 ">
          <div className=" hidden sm:flex items-center  ">LOGO</div>
          <div className="sm:hidden absolute left-1/2 transform -translate-x-1/2">
            LOGO
          </div>

          {/* desktop*/}
          <ul className="hidden sm:flex space-x-6 ml-10">
            {Links.map(({ to, label }) => {
              return (
                <li key={to} className="hover:text-gray-400">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive ? "text-gray-600 font-semibold" : undefined
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/*profile */}
          <div className="sm:block ml-auto relative">
            <button
              onClick={() => setProfMod(!profMod)}
              className="rounded-full border-2 border-transparent hover:border-white focus:outline-none"
              aria-label="User-menu"
            >
              ss
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-600 text-black py-1 z-50 transition-all duration-400 origin-right pl-4  ${
                profMod
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <ul>
                {profLinks.map(({ to, label }) => (
                  <li key={to} className="hover:text-gray-400">
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive ? "text-gray-600 font-semibold" : undefined
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/** meu button for small screen */}
          <div className="sm:hidden absolute left-0 flex items-center justify-between ">
            <button
              onClick={() => setUserMod(!userMod)}
              className="focus:outline-none relative items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 hover:ring-white hover:outline-none hover:ring-inset"
              aria-label="mobile menu button"
            >
              {userMod ? (
                <svg
                  class="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
        {userMod && (
          <div
            className={`sm:hidden bg-gray-700 text-white px-4 py-2 space-y-2
            transition-all duration-300 ease-out origin-top transform ${
              userMod
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-10 pointer-events-none"
            }`}
          >
            {/* Dropdown links */}
            {Links.map(({ to, label }, index) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setUserMod(false)}
                className={({ isActive }) =>
                  `block px-2 py-1 rounded hover:bg-gray-600 opacity-0 translate-y-4
                animate-fade-in-down animate-delay-${index * 100} ${
                    isActive ? "bg-gray-500 font-semibold" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <hr className="border-gray-600" />

            {profLinks.map(({ to, label }, index) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setUserMod(false)}
                className={`
                block px-2 py-1 rounded hover:bg-gray-600 text-white opacity-0 translate-y-4 
                animate-fade-in-down animate-delay-${
                  (Links.length + index) * 100
                }
              `}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </>
    );
}


 