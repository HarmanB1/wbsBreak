import { NavLink} from "react-router";

export const Nav = ()=>{
    return (
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/project">Projects</NavLink>
        </li>
        <li>
          <NavLink to="/sprint">Sprint</NavLink>
        </li>
        <li>
          <NavLink to="/wbs">WBS</NavLink>
        </li>
        <li>
          <NavLink to="/scrum">Scrum</NavLink>
        </li>
      </ul>
    );
}


 