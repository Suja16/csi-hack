import { useState } from "react";
import { Outlet } from "react-router";
import { Box } from "@mui/material";
import AppBarHeader from "../components/AppBarHeader.jsx";
import Sidebar from "../components/NewSidebar.jsx";

export default function NavSideLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AppBarHeader
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Box
          sx={{
            flex: 1,
            padding: "1.05rem",
            paddingTop: "5rem",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
