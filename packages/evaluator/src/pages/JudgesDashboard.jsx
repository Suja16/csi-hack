import React, { useState, useContext } from "react";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import UserDataContext from "../contexts/userDataContext";
import { useNavigate } from "react-router";
import { APPROVED_TEAMS } from "../queries";

const JudgesDashboard = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState();

  const { data, loading, error } = useQuery(APPROVED_TEAMS);

  const handleTeamChange = (event, newInputValue) => {
    setSelectedTeam(data.Team.find((team) => team.id === newInputValue.id));
  };

  const handleLogout = () => {
    setUserData(null);
    navigate("/login");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading teams</Typography>;

  const teamOptions = data.Team.map((team) => ({
    label: team.name,
    id: team.id,
  }));

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <Box flexGrow={1}></Box>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flex={1} p={2} flexDirection="column">
        <Autocomplete
          disablePortal
          options={teamOptions}
          fullWidth
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Team" />
          )}
          onChange={handleTeamChange}
          value={
            selectedTeam
              ? { label: selectedTeam.name, id: selectedTeam.id }
              : null
          }
        />
        {selectedTeam ? (
          <Typography variant="h4">{selectedTeam.name}</Typography>
        ) : (
          <Typography variant="h4">Select a team to view details</Typography>
        )}
      </Box>
    </Box>
  );
};

export default JudgesDashboard;
