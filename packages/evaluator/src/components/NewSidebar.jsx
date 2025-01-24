import { useContext } from "react";
import {
  Drawer,
  List,
  Tooltip,
  Box,
  Typography,
  Button,
  Toolbar,
  IconButton,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import TeamsContext from "../contexts/teamsContext";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import logo from "../assets/idea.png";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const { teams, setSelectedTeam } = useContext(TeamsContext);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: isSidebarOpen ? "block" : "none", sm: "block" },
        width: isSidebarOpen ? "15rem" : "3.75rem",
        position: { xs: "fixed", lg: "relative" },
        zIndex: "10",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? "15rem" : "4rem",
          boxSizing: "border-box",
          position: "fixed",
          left: 0,
          background: "#fff",
          borderRadius: "0.625rem",
          boxShadow: "0 0 2.5rem rgba(0, 0, 0, 0.03)",
          overflowX: "hidden",
          transition: "width 0.3s",
        },
      }}
      anchor="left"
    >
      <Toolbar>
        {/* Menu Icon to toggle Sidebar */}

        {/* {isSidebarOpen && (
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
        )} */}
      </Toolbar>
      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "left",
          p: 1,
          pl: isSidebarOpen ? 2 : 1.3,
          color: "#666666",
          borderTop: "2px solid #f0f0f0",
        }}
      >
        Teams
      </Typography>
      <List>
        {teams && teams[0] ? (
          teams.map((item, index) => (
            <Tooltip title={item.label} placement="right" arrow key={index}>
              <Button
                onClick={() => setSelectedTeam(teams[index])}
                variant="button"
                sx={{
                  width: "100%",
                  minHeight: "3.75rem",
                  display: "flex",
                  justifyContent: "left",
                  pl: 3,
                  pb: 2,
                  borderRadius: 0,
                  textTransform: "none",
                  color:
                    location.pathname === item.path
                      ? "rgba(21, 101, 192, 1)"
                      : "black",
                  backgroundColor:
                    location.pathname === item.path ? "#d0efff" : "transparent",
                  "&:hover": { backgroundColor: "#c0dceb" },

                  gap: 2,
                  mb: 1,
                }}
              >
                <PeopleAltIcon />
                <Typography variant="h6">
                  {isSidebarOpen && item.name}
                </Typography>
              </Button>
            </Tooltip>
          ))
        ) : (
          <Box
            sx={{
              height: "30vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">
              {teams && teams.length === 0 ? "No teams" : "Loading..."}
            </Typography>
          </Box>
        )}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
