import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, TextField, MenuItem, Select, Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import UserDataContext from '../contexts/userDataContext';
import { useNavigate } from 'react-router';
import { APPROVED_TEAMS } from '../queries';

const JudgesDashboard = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const { data, loading, error } = useQuery(APPROVED_TEAMS);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleLogout = () => {
    setUserData(null);
    navigate("/login");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading teams</Typography>;

  const filteredTeams = data.Team.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Box flexGrow={1}>
          </Box>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flex={1} p={2} flexDirection="column">
        <Select
          value={selectedTeam}
          onChange={handleTeamChange}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select a team
          </MenuItem>
          {filteredTeams.map((team) => (
            <MenuItem key={team.id} value={team}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
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
