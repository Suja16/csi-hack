import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

import UserDataContext from "../contexts/userDataContext";

function DataProvider() {
  const [userData, setUserData] = useState();
  const [eventData, setEventData] = useState();
  const [loginLoading, setLoginLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      setLoginLoading(true);
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUserData(response.data.user);
      const participantResponse = await axios.post(
        `/api/v1/event/p/get/` + import.meta.env.VITE_EVENT_ID,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        },
      );
      setEventData(participantResponse.data.event);
      setLoginLoading(false);
      // if (participantResponse.data.event.Participant) {
      //   setIsLoding(false);
      //   navigate("/team");
      //   return;
      // }
    },
    flow: "auth-code",
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserData(null);
    setEventData(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      setUserData(null);
      setEventData(null);
      return;
    }

    const getUserData = async () => {
      try {
        const response = await axios.post(
          "/api/v1/user/p/me",
          {},
          {
            baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    const getParticipantData = async () => {
      try {
        const response = await axios.post(
          `/api/v1/event/p/get/` + import.meta.env.VITE_EVENT_ID,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
          },
        );
        setEventData(response.data.event);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
    getParticipantData();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        eventData,
        setEventData,
        login,
        logout,
        loginLoading,
        setLoginLoading,
      }}
    >
      <Outlet />
    </UserDataContext.Provider>
  );
}

export default DataProvider;
