import { isAuthenticated } from "@/utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
