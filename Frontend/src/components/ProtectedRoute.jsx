import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("auth_token");

  if (!token) {

    return <Navigate to="/auth"/>
  }

  return children;

}

export default ProtectedRoute;