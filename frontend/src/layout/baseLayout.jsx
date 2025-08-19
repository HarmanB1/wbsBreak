import { Nav } from "./nav";
import { Outlet } from "react-router";

export const Layout = ({nav})=>{
    return(
        <div>
            {nav}
            <main>
                <Outlet/>
            </main>
        </div>

    );
}