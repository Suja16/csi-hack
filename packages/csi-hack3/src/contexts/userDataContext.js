import { createContext } from "react";

const data = {
  userData: null,
  setUserData: () => {},
  eventData: null,
  setEventData: () => {},
  login: () => {},
  logout: () => {},
  loginLoading: false,
  setLoginLoading: () => {},
};

const UserDataContext = createContext(data);

export default UserDataContext;
