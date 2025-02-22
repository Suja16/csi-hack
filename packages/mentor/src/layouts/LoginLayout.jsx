import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router";
import UserDataContext from "../contexts/userDataContext";

export default function LoginLayout() {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();
  if (!userData) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
      />
    );
  }
  return <Outlet />;
}
