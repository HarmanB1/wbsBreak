import { Nav } from "./nav";
import { Outlet } from "react-router";

const Layout = ()=>{
    return(
        <div>
            <Nav/>
            <main>
                <Outlet/>
            </main>
        </div>

    );
}