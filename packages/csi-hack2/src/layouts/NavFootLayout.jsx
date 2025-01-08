import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Box } from "@mui/material";
import { Outlet } from 'react-router';

export default function FooterLayout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Box
        sx={{
          paddingTop: "5rem",
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%'
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
