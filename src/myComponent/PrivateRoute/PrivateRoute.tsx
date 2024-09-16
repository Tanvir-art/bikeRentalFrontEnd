import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const { token, role } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!token) {
      // If the user is not logged in, redirect to the login page
      navigate("/login");
    } else if (requiredRole && role !== requiredRole) {
      // If the user is logged in but does not have the required role, redirect to the homepage or a not authorized page
      navigate("/");
    }
  }, [token, role, requiredRole, navigate]);

  // If the user is not logged in or does not have the required role, don't render the children
  if (!token || (requiredRole && role !== requiredRole)) {
    return null;
  }

  // If the user is logged in and has the required role, render the children
  return <>{children}</>;
};

export default PrivateRoute;
