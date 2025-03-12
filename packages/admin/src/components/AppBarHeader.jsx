import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
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
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  const handleExcelDownload = () => {
    // Open the Google Sheets export URL in a new tab to download the Excel file
    window.open('https://docs.google.com/spreadsheets/d/1rYLcFG2MODvOMWOjjz-fbzACSApmPy9nY22DyF-N3pw/export?format=xlsx', '_blank');
  };

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
        <IconButton
          edge="start"
          color="black"
          onClick={toggleSidebar}
          sx={{ marginRight: 2 }}
        >
          {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        <Box
          component="img"
          src={logo}
          alt="App Logo"
          sx={{
            width: "150px",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        />
        <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<FileDownloadIcon />}
            onClick={handleExcelDownload}
          >
            Download Excel
          </Button>
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
