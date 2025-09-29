import { Navigate } from "react-router"

import { useAuth } from "./authContext"

export const PrivGaurd = ({children}) => 
    {

        const {user} = useAuth();

        return user ? children: <Navigate to="/login"></Navigate>
    }