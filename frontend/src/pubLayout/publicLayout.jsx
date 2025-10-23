import { Outlet } from "react-router-dom";
import { PubNavBar } from "./pubNavBar";
export const PublicLayout = () =>{
    return(
        <div>
            <PubNavBar />
            <Outlet />
            
        </div>
    );

}