import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth", auth)
  let allowed= auth &&  auth.roles.find(role=> allowedRoles?.includes(role))
  console.log(allowed, 'v')

  return (
    // auth.roles && allowedRoles?.includes(auth.roles)
    allowed
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/dashboard" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />


  );
}

export default RequireAuth