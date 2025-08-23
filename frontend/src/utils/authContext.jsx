import { createContext,use,useContext, useState } from "react";

const UserContext = createContext();

export const UserAuth = ({children}) =>{
    const [user, setUser] = useState(null);

    const login = (userData) =>{
        setUser(userData);
    };

    const logout = (userData) => {
      setUser(null);
    };

    return(
        <UserContext.Provider value={{user, login, logout}}>
    {children}
    </UserContext.Provider>

    );
}


