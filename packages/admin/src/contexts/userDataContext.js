import { createContext } from "react";

const data = {
  userData: null,
  setUserData: () => {},
};

const UserDataContext = createContext(data);

export default UserDataContext;
