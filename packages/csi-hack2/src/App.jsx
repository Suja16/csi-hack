import { RouterProvider } from "react-router-dom";
import router from "./routes/router"
import { useState, useEffect } from "react";
import UserDataContext from "./contexts/userDataContext";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState();
  const [eventData, setEventData] = useState();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      setUserData(null);
      setEventData(null);
    }

    const getUserData = async () => {
      try {
        const response = await axios.post("/api/v1/user/p/me", {}, {
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response)
        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    const getParticipantData = async () => {
      try {
        const response = await axios.post(
          `/api/v1/event/p/get/47`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
          }
        );
        console.log(response.data)
        setEventData(response.data.event);
        // if (response.data.event.Participant) {
        //   // navigate("/header");
        // }
      } catch (error) {
        console.error(error);
      }
    }
    getUserData();
    getParticipantData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, eventData }}>
      <RouterProvider router={router} />
    </UserDataContext.Provider>
  )
}

export default App;
