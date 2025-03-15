import "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { People, Score } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BarChartIcon from "@mui/icons-material/BarChart";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const menuItems = [
    { label: "All Teams", icon: <People />, path: "/" },
    { label: "Add Evaluators", icon: <HowToRegIcon />, path: "/addevaluators" },
    { label: "Statistics", icon: <BarChartIcon />, path: "/statistics" },
    { label: "Panels", icon: <People />, path: "/panels" },
    { label: "Normalised scores", icon: <Score />, path: "/Normalised" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: isSidebarOpen ? "block" : "none", sm: "block" },
        width: isSidebarOpen ? "15rem" : "3.75rem",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isSidebarOpen ? "15rem" : "3.75rem",
          boxSizing: "border-box",
          position: "fixed",
          top: "4rem",
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
      <List>
        {menuItems.map((item, index) => (
          <Tooltip title={item.label} placement="right" arrow key={index}>
            <ListItem
              component={Link}
              to={item.path}
              sx={{
                marginBottom: isSidebarOpen ? "0.5rem" : "1rem",
                marginLeft: isSidebarOpen ? "0.5rem" : "0",
                marginRight: isSidebarOpen ? "0.5rem" : "0",
                backgroundColor:
                  location.pathname === item.path ? "#d0efff" : "transparent",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "#c0dceb",
                },
                "& .MuiListItemText-root": {
                  color: "black",
                },
                "& .MuiListItemIcon-root": {
                  color:
                    location.pathname === item.path
                      ? "rgba(21, 101, 192, 1)"
                      : "black",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isSidebarOpen && (
                <ListItemText
                  primary={item.label}
                  sx={{ whiteSpace: "nowrap", minWidth: "0" }}
                />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
