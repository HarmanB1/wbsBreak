
import { Outlet } from "react-router";

export const BaseLayout = ({nav})=>{
    return(
        <div>
            {nav}
            <main>
                <Outlet/>
            </main>
        </div>

    );
}