import "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo from "../assets/idea.png";

const AppBarHeader = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: "0.5px solid black",
      }}
    >
      <Toolbar>
        {/* Menu Icon to toggle Sidebar */}
        <IconButton
          edge="start"
          color="black"
          onClick={toggleSidebar}
          sx={{ marginRight: 2 }}
        >
          {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        {/* App Logo */}
        <Box
          component="img"
          src={logo}
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
  );
};

AppBarHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default AppBarHeader;