import { useContext } from "react";
import {
  Drawer,
  List,
  Tooltip,
  Box,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { NavLink } from "react-router";

import PropTypes from "prop-types";
import TeamsContext from "../contexts/teamsContext";

const Sidebar = ({ isSidebarOpen }) => {
  const { evaluatedTeams, nonEvaluatedTeams } = useContext(TeamsContext);

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
      <Toolbar />
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
        {isSidebarOpen && "Teams yet to be evaluated"}
      </Typography>
      <List>
        {Object.keys(nonEvaluatedTeams).map((teamId) => (
          <Tooltip
            title={nonEvaluatedTeams[teamId].team_info_from_eventio.name}
            placement="right"
            key={teamId}
          >
            <Button
              variant="text"
              component={NavLink}
              to={`/teams/${teamId}`}
              sx={{
                display: isSidebarOpen ? "flex" : "block",
                justifyContent: "flex-start",
                p: 1,
                pl: isSidebarOpen ? 2 : 1.3,
                width: "100%",
                textTransform: "none",
                color: "#666666",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&.active": {
                  color: "#000",
                  background: "#f0f0f0",
                },
              }}
            >
              <PeopleAltIcon
                sx={{
                  color: "#666666",
                  fontSize: "1.25rem",
                  mr: isSidebarOpen ? 1 : 0,
                }}
              />
              {isSidebarOpen &&
                nonEvaluatedTeams[teamId].team_info_from_eventio.name}
            </Button>
          </Tooltip>
        ))}
      </List>
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
        {isSidebarOpen && "Evaluated Teams"}
      </Typography>
      <List>
        {Object.keys(evaluatedTeams).map((teamId) => (
          <Tooltip
            title={evaluatedTeams[teamId].team_info_from_eventio.name}
            placement="right"
            key={teamId}
          >
            <Button
              component={NavLink}
              to={`/teams/${teamId}`}
              variant="text"
              sx={{
                display: isSidebarOpen ? "flex" : "block",
                justifyContent: "flex-start",
                p: 1,
                pl: isSidebarOpen ? 2 : 1.3,
                width: "100%",
                textTransform: "none",
                color: "#666666",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                "&.active": {
                  color: "#000",
                  background: "#f0f0f0",
                },
              }}
            >
              <PeopleAltIcon
                sx={{
                  color: "#666666",
                  fontSize: "1.25rem",
                  mr: isSidebarOpen ? 1 : 0,
                }}
              />
              {isSidebarOpen &&
                evaluatedTeams[teamId].team_info_from_eventio.name}
            </Button>
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

// {Object.keys(allTeams).map((teamId) => (
//   <Tooltip
//     key={teamId}
//     title={allTeams[teamId].team_info_from_eventio.name}
//     placement="right"
//   >
//     <Button
//       component={NavLink}
//       to={`/teams/${teamId}`}
//       variant="text"
//       sx={{
//         display: "flex",
//         justifyContent: isSidebarOpen ? "flex-start" : "center",
//         alignItems: "center",
//         width: "100%",
//         p: 1,
//         pl: isSidebarOpen ? 2 : 1.3,
//         borderRadius: 0,
//         color: "#666666",
//         "&.active": {
//           color: "#000",
//           background: "#f0f0f0",
//         },
//       }}
//     >
//       <PeopleAltIcon
//         sx={{
//           fontSize: "1.5rem",
//           mr: isSidebarOpen ? 1 : 0,
//         }}
//       />
//       {isSidebarOpen && allTeams[teamId].team_info_from_eventio.name}
//     </Button>
//   </Tooltip>
// ))}
