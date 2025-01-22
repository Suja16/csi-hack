import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import UserDataContext from "../contexts/userDataContext";

export default function LoginLayout() {
  const { userData } = useContext(UserDataContext);
  if (!userData) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
