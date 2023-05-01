import { Outlet, Navigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

const RequireAuth = () => {

    const location = useLocation();
    const { getToken } = AuthUser();
    
    return (
        getToken() ? <Outlet /> : <Navigate to="/unauthorized" state={{from: location}} replace />
    )
}

export default RequireAuth