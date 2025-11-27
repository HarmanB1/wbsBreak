import { Outlet } from "react-router-dom";
import { PubNavBar } from "./privNavBar";
export const PublicLayout = () =>{
    return(
        <div>
            <PrivNavBar />
            <Outlet />
            
        </div>
    );

}