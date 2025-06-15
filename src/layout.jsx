import { Nav } from "./nav";
import { Outlet } from "react-router";

export const Layout = ()=>{
    return(
        <div>
            <Nav/>
            <main>
                <Outlet/>
            </main>
        </div>

    );
}