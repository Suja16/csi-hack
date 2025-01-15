import { createContext } from 'react';

const data = {
  userData: null,
  setUserData: null,
  eventData: null,
  setEventData: null,
};

const UserDataContext = createContext(data);

export default UserDataContext;
