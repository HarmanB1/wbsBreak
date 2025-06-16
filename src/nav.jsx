import { NavLink} from "react-router";
import { useState } from "react";

export const Nav = ()=>{
    const Links = [
      { to: "/", label: "Home" },
      { to: "/project", label: "Projects" },
      { to: "/sprint", label: "Sprint" },
      { to: "/wbs", label: "WBS" },
      { to: "scrum", label: "Scrum" },
    ];



    return (
      <nav className="flex bg-gray-800 dark:bg-gray-900 text-white  p-4 gap-x-3">
        <div className="flex items-center justify-between">
          LOGO
        </div>
        {/* desktop*/}
        <ul className="hidden sm:flex space-x-6">
          {
            Links.map(
              ({to, label})=>{
                return (
                  <li key={to} className="hover:text-gray-400">
                    <NavLink to={to} className={
                      ({isActive})=> isActive ? "text-gray-600 font-semibold" : undefined
                    }>{label}</NavLink>
                  </li>
                );
              }
            )
          } 
        </ul>
      </nav>
    );
}


 