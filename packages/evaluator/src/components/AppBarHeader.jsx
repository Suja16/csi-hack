import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo from "../assets/idea.png";
import UserDataContext from "../contexts/userDataContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const AppBarHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData(null);
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
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
            // height: "40px",
            width: "150px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

AppBarHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default AppBarHeader;
