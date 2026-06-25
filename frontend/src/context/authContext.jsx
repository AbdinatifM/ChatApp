import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { api } from "../api/api";
import { toast } from 'react-hot-toast'
 


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async() => {
            try {
                const res = await api.get("/auth/me");
                
                console.log("res Status: ", res.status);
                console.log("res data: ", res.data);
                if (res.status === 200) {
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                    navigate("/home");
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            } 
        }
        checkAuth();
    }, []);
    const login = (user = null) => {
        setIsAuthenticated(true);
        setUser(user);
        navigate("/home");
    }

    const logout = async() => {
        try {
            const res = await api.post("/auth/logout");
            
            toast.success("You've successfully logged out!");
            setIsAuthenticated(false);
            setUser(null);
            navigate("/");
        } catch (error) {
            toast.error("You are unable to log out!");
        }
    }   

    if (loading) return <div>Loading...</div>;

    return (
       <AuthContext.Provider value={{isAuthenticated, login , logout}}>
            {children}
       </AuthContext.Provider>
    )
}