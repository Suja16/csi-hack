import { Navigate } from "react-router-dom";

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ element, isAuthenticated }) => {
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
