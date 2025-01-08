import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { useMediaQuery } from "@mui/material";

export default function FooterLayout() {
  const isMobile = useMediaQuery("(max-width:500px)");
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
    </Box>
  );
}
