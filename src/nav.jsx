import { NavLink} from "react-router";
import { useState } from "react";

export const Nav = ()=>{
    const [profMod, setProfMod] = useState(false);
    

    const Links = [
      { to: "/", label: "Home" },
      { to: "/project", label: "Projects" },
      { to: "/sprint", label: "Sprint" },
      { to: "/wbs", label: "WBS" },
      { to: "scrum", label: "Scrum" },
    ];



    return (
      <nav className="flex bg-gray-800 dark:bg-gray-900 text-white  p-4 gap-x-3 items-center h-16 ">
        <div className=" hidden sm:flex items-center ">
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
        <div className="hidden sm:block ml-auto relative">
          <button
            onClick={()=>setProfMod(!profMod)}
            className="rounded-full border-2 border-transparent hover:border-white focus:outline-none "
            aria-label="User-menu"
          >
            s
          </button>
          {profMod &&
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-black py-1 z-50">
            </div>

          }
        </div>
        {/** meu button for small screen */}
        <div className="sm:hidden absolute left-0 flex items-center justify-between ">
          <button
            className="focus:outline-none relative items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 hover:ring-white hover:outline-none hover:ring-inset"
            aria-label="mobile menu button"
          >
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
          </button>
        </div>
      </nav>
    );
}


 