import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import type { Role } from "../types/types";

export const UserRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export const RoleRoute = ({ allowedRoles }: { allowedRoles: Array<Role> }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
