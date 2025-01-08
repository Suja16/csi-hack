import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Box } from "@mui/material";
import { Outlet } from 'react-router';

export default function FooterLayout() {
  return (
    <>
      <Navbar />
      <Box
        paddingTop={"5rem"}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
