import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import UserDataContext from "../contexts/userDataContext";

export default function FooterLayout() {
  const isMobile = useMediaQuery("(max-width:1146px)");

  const { userData, login, logout, loginLoading } = useContext(UserDataContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          paddingTop: "5rem",
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
      {isMobile &&
        (!userData ? (
          <LoadingButton
            onClick={() => login()}
            loading={loginLoading}
            variant="contained"
            color="primary"
            sx={{
              paddingY: "1rem",
              position: "fixed",
              width: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Typography
              variant="body3"
              sx={{
                fontWeight: "bold",
              }}
            >
              Login
            </Typography>
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={() => logout()}
            loading={loginLoading}
            variant="contained"
            color="primary"
            sx={{
              paddingY: "1rem",
              position: "fixed",
              width: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Typography
              variant="body3"
              sx={{
                fontWeight: "bold",
              }}
            >
              Logout
            </Typography>
          </LoadingButton>
        ))}
    </Box>
  );
}
