import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTeams } from "../context/teamsContext";
import logo from "../assets/idea.png";

export default function AppBarHeader() {
  const { isSidebarOpen, setSidebarOpen } = useTeams();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "#ffffff" }} position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "start" , alignItems: "center"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            sx={{ mr: 2 , mt:1 }}
          >
            {isSidebarOpen ? (
              <MenuOpenIcon sx={{ color: "black" }} />
            ) : (
              <MenuIcon sx={{ color: "black" }} />
            )}
          </IconButton>

          <Box
            component="img"
            src={logo} // Make sure to update this path
            alt="App Logo"
            sx={{
              height: "40px",
              width: "150px",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
