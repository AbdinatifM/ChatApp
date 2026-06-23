import { createContext, useState } from "react";



export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const login = (user = null, isAuth = false) => {
        setIsAuthenticated(isAuth);
        setUser(user);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
       <AuthContext.Provider value={{isAuthenticated, login , logout}}>
            {children}
       </AuthContext.Provider>
    )
}