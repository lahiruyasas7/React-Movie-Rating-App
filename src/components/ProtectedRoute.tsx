import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = !!userData.accessToken; // with !!, check true or false
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;