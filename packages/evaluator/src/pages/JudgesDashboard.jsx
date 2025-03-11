import React, { useContext } from "react";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  Divider,
  Avatar,
  Skeleton,
  Alert,
  useTheme,
} from "@mui/material";
import {
  Gavel as GavelIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import UserDataContext from "../contexts/userDataContext";
import { useNavigate } from "react-router";
import { APPROVED_TEAMS } from "../queries";

const JudgesDashboard = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, loading, error } = useQuery(APPROVED_TEAMS);
  const [selectedTeam, setSelectedTeam] = React.useState(null);

  const handleTeamChange = (_, newValue) => {
    if (newValue) {
      setSelectedTeam(data.Team.find((team) => team.id === newValue.id));
    } else {
      setSelectedTeam(null);
    }
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  };

  const NoTeamSelected = () => (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        border: `1px dashed ${theme.palette.divider}`
      }}
    >
      <GroupIcon sx={{ fontSize: 60, color: theme.palette.text.secondary, mb: 2 }} />
      <Typography variant="h5" color="textSecondary" gutterBottom>
        No Team Selected
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Please select a team from the dropdown above to view their details
      </Typography>
    </Paper>
  );

  const TeamDetails = ({ team }) => (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            bgcolor: theme.palette.primary.main,
            mr: 2
          }}
        >
          {team.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4" gutterBottom>
            {team.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Team ID: {team.id}
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom display="flex" alignItems="center">
              <AssessmentIcon sx={{ mr: 1 }} /> Evaluation Criteria
            </Typography>
            <Typography variant="body1">
              Here you can add your evaluation scores and comments for this team.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );

  const LoadingState = () => (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={400} />
    </Box>
  );

  const ErrorState = () => (
    <Alert 
      severity="error" 
      sx={{ mb: 2 }}
      action={
        <Button color="inherit" size="small" onClick={() => window.location.reload()}>
          RETRY
        </Button>
      }
    >
      Error loading teams: {error?.message}
    </Alert>
  );

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;

    const teamOptions = data.Team.map((team) => ({
      label: team.name,
      id: team.id,
    }));

    return (
      <>
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Autocomplete
            disablePortal
            options={teamOptions}
            fullWidth
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Select Team" 
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon color="action" sx={{ mr: 1 }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            onChange={handleTeamChange}
            value={selectedTeam ? { label: selectedTeam.name, id: selectedTeam.id } : null}
          />
        </Paper>
        
        {selectedTeam ? <TeamDetails team={selectedTeam} /> : <NoTeamSelected />}
      </>
    );
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh",
      bgcolor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.default
    }}>
      <AppBar position="static">
        <Toolbar>
          <GavelIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Judges Dashboard
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>
      
      <Box component="footer" sx={{ p: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} CSI-KJSCE
        </Typography>
      </Box>
    </Box>
  );
};

export default JudgesDashboard;
