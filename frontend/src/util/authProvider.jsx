import { useContext, useState, useEffect, createContext } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            setuser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData)=>{
        setuser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
    }
const logout = (userData)=>{
        setuser(null);
        localStorage.removeItem('user');
        
    };


  return <AuthContext.Provider value= {{user, login, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
