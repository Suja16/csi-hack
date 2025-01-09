import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Box, Button } from "@mui/material";
import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

export default function FooterLayout() {
  const isMobile = useMediaQuery("(max-width:1146px)");
  const [userData, setUserData] = useState({});
  const [open, setopen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS }
      );
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", response.data.user);
      const participantResponse = await axios.post(
        `https://api.csi-kjsce.org/api/v1/event/p/get/47`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (participantResponse.data.event.Participant) {
        // navigate("/header");
      }
      const user = response.data.user;
      setUserData({
        degree: user.degree,
        college: user.college,
        branch: user.branch,
        year: user.year,
        gender: user.gender,
        phone_number: user.phone_number,
      });
      setopen(true);
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
      <Navbar userData={userData} login={login} open={open} setopen={setopen} />
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
            bottom: "1rem",
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
