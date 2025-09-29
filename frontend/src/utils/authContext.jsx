// UserAuth.jsx
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserAuth = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    if(!savedUser) return null;

    try{
        return JSON.parse(savedUser);
}catch{
    console.warn("invalid");
    localStorage.removeItem("user");
    return null;
}
  });

  const login = (userData) => {setUser(userData); localStorage.setItem("user", JSON.stringify(userData));}
  const logout = () => {  setUser(null); localStorage.removeItem("user");}

 if(typeof window !== "undefined") {
    window.loginAs = () => login({ name: "dev" });

    window.logout = logout;
    window.userIs = () => {
        console.log(JSON.parse(localStorage.getItem("user")));
    }
 }
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
