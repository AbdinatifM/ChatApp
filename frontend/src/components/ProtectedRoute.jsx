import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";


export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  console.log("ProtectedRoute: ", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}