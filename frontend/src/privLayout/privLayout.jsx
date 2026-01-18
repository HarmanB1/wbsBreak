import { Outlet } from "react-router-dom";
import { PrivNavBar } from "./privNavBar";
export const PrivateLayout = () => {
  return (
    <div>
      <PrivNavBar />
      <div className="pt-20        "><Outlet /></div>

    </div>
  );

}
