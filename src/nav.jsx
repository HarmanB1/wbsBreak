import { NavLink} from "react-router";

export const Nav = ()=>{
    return (
      <nav className="flex bg-gray-800 dark:bg-gray-900 text-white items-center justify-between p-4">
        <ul className="flex space-x-6">
          <li className="hover:text-gray-400">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink to="/project">Projects</NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink to="/sprint">Sprint</NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink to="/wbs">WBS</NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink to="/scrum">Scrum</NavLink>
          </li>
        </ul>
      </nav>
    );
}


 