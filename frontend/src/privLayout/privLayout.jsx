import { Outlet } from "react-router-dom";
import { PrivNavBar } from "./privNavBar";
export const PrivateLayout= () =>{
    return(
        <div>
            <PrivNavBar />
            <Outlet />
            
        </div>
    );

}