/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth", auth);
  const allowed = auth?.roles?.find((role) => allowedRoles?.includes(role));
  console.log(allowed, 'v');

  return allowed ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
