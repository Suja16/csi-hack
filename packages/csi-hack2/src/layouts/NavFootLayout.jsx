import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Box, Button } from "@mui/material";
import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../contexts/userDataContext";

export default function FooterLayout() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:1146px)");
  const [open, setopen] = useState(false);
  const [isLoading, setIsLoding] = useState(false);

  const { setUserData, setEventData } = useContext(UserDataContext);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      setIsLoding(true);
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS }
      );
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", response.data.user);
      setUserData(response.data.user);
      const participantResponse = await axios.post(
        `/api/v1/event/p/get/` + import.meta.env.VITE_EVENT_ID,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        }
      );
      setEventData(participantResponse.data.event);
      if (participantResponse.data.event.Participant) {
        setIsLoding(false);
        navigate("/team");
        return;
      }
      setopen(true);
      setIsLoding(false);
    },
    flow: "auth-code",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar
        login={login}
        open={open}
        setopen={setopen}
        isLoading={isLoading}
      />
      <Box
        sx={{
          paddingTop: "6rem",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginBottom: isMobile
              ? {
                  xs: "7rem",
                  sm: "7rem",
                }
              : null,
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
      {isMobile && (
        <Button
          variant="contained"
          onClick={() => login()}
          sx={{
            width: "100%",
            position: "fixed",
            padding: "1rem",
            bottom: 0,
            zIndex: 1000,
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Register Now
        </Button>
      )}
    </Box>
  );
}
