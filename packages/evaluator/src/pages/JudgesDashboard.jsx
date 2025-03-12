import { useContext, useRef, useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
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
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import {
  Gavel as GavelIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import UserDataContext from "../contexts/userDataContext";
import { useNavigate } from "react-router";
import { APPROVED_TEAMS } from "../queries";
import { alpha } from "@mui/material/styles";

const JudgesDashboard = () => {
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, loading, error } = useQuery(APPROVED_TEAMS);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  const handleTeamChange = (_, newValue) => {
    if (newValue) {
      const team = data.Team.find((team) => team.id === newValue.id);
      setSelectedTeam(team);
      scrollToTeam(team.id);
    }
  };

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
    scrollToTeam(team.id);
  };

  const scrollToTeam = (teamId) => {
    if (scrollRef.current) {
      const element = document.getElementById(`team-item-${teamId}`);
      if (element) {
        const scrollContainer = scrollRef.current;
        const elementRect = element.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        const centerPosition =
          elementRect.left +
          scrollContainer.scrollLeft -
          containerRect.left -
          containerRect.width / 2 +
          elementRect.width / 2;

        const controls = animate(scrollContainer.scrollLeft, centerPosition, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          onUpdate: (value) => {
            scrollContainer.scrollLeft = value;
          },
        });

        return () => controls.stop();
      }
    }
  };

  useEffect(() => {
    if (data && data.Team && data.Team.length > 0 && !selectedTeam) {
      setSelectedTeam(data.Team[0]);
    }
  }, [data, selectedTeam]);

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  };

  const NoTeamSelected = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          textAlign: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: alpha(theme.palette.primary.light, 0.05),
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
          }}
        >
          <GroupIcon
            sx={{
              fontSize: 60,
              color: alpha(theme.palette.primary.main, 0.3),
              mb: 2,
            }}
          />
        </motion.div>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No Team Selected
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please select a team from the carousel above to view their details
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mt: 2, alignSelf: "center" }}
            startIcon={<GroupIcon />}
            onClick={() => scrollRef.current?.focus()}
          >
            Browse Teams
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );

  const TeamDetails = ({ team }) => {
    const domains = ["FinTech", "Genai", "Cybersecurity"];
    const domain = domains[team.id % domains.length];

    const mentorReview = {
      name: "Dr. Smith",
      comment: "Very good project, but could have ben better",
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="flex-start" mb={2}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: theme.palette.primary.main,
                  mr: 2,
                  fontSize: "1.5rem",
                  boxShadow: 1,
                }}
              >
                {team.name.charAt(0)}
              </Avatar>
            </motion.div>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="500">
                {team.name}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Chip
                    label={`Team ID: ${team.id}`}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1, fontSize: "0.7rem" }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Chip
                    label={domain}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem" }}
                  />
                </motion.div>
              </Box>
            </Box>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mt: 2,
                mb: 3,
                borderRadius: 1.5,
                backgroundColor: alpha(theme.palette.info.light, 0.05),
                borderColor: alpha(theme.palette.info.main, 0.2),
              }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <CommentIcon
                  sx={{ fontSize: 18, color: theme.palette.info.main, mr: 1 }}
                />
                <Typography variant="subtitle2" color="info.main">
                  Mentor Review
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", color: "text.secondary" }}
              >
                "{mentorReview.comment}"
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", mt: 1, textAlign: "right" }}
              >
                — {mentorReview.name}
              </Typography>
            </Paper>
          </motion.div>

          <Divider sx={{ my: 2 }} />

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
            variant="scrollable"
            scrollButtons="auto"
            size="small"
          >
            <Tab
              label="Evaluation"
              icon={<AssessmentIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              sx={{ fontSize: "0.8rem", minHeight: 40 }}
            />
            <Tab
              label="Problem Statement"
              icon={<DescriptionIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              sx={{ fontSize: "0.8rem", minHeight: 40 }}
            />
          </Tabs>

          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: theme.palette.primary.light,
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  <AssessmentIcon
                    sx={{
                      mr: 1,
                      fontSize: 16,
                      color: theme.palette.primary.main,
                    }}
                  />
                  Evaluation Criteria
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Evaluation scores{" "}
                </Typography>
                {/* Evaluation form would go here */}
              </Paper>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 1.5,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: theme.palette.primary.light,
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  display="flex"
                  alignItems="center"
                >
                  <DescriptionIcon
                    sx={{
                      mr: 1,
                      fontSize: 16,
                      color: theme.palette.primary.main,
                    }}
                  />
                  Problem Statement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  This problem statement is about fintech, cybersec, genai etc
                  etc
                </Typography>
              </Paper>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    );
  };

  const LoadingState = () => (
    <Box sx={{ width: "100%" }}>
      <Skeleton
        variant="rectangular"
        height={50}
        sx={{ mb: 2, borderRadius: 1 }}
      />
      <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
    </Box>
  );

  const ErrorState = () => (
    <Alert
      severity="error"
      sx={{ mb: 2, borderRadius: 2 }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => window.location.reload()}
        >
          RETRY
        </Button>
      }
    >
      Error loading teams: {error?.message}
    </Alert>
  );

  const TeamScrollbar = ({ teams }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
      if (selectedTeam && scrollRef.current) {
        const element = document.getElementById(`team-item-${selectedTeam.id}`);
        if (element) {
          const scrollContainer = scrollRef.current;
          const elementRect = element.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();

          const scrollPosition =
            element.offsetLeft -
            containerRect.width / 2 +
            elementRect.width / 2;

          animate(scrollContainer.scrollLeft, scrollPosition, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            onUpdate: (value) => {
              scrollContainer.scrollLeft = value;
            },
          });
        }
      }
    }, [selectedTeam]);

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
      scrollRef.current.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          mb: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "60px",
            background: `linear-gradient(to right, ${theme.palette.background.paper}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              py: 2,
              px: 2,
              cursor: "grab",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: alpha(theme.palette.primary.light, 0.1),
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                borderRadius: "3px",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.5),
                },
              },
              scrollbarWidth: "thin",
              scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} ${alpha(theme.palette.primary.light, 0.1)}`,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {teams.map((team) => {
              const isSelected = selectedTeam && selectedTeam.id === team.id;

              return (
                <motion.div
                  id={`team-item-${team.id}`}
                  key={team.id}
                  whileHover={{
                    y: -3,
                    boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: isSelected ? 1.05 : 1,
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : alpha(theme.palette.primary.light, 0.1),
                    color: isSelected
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    boxShadow: isSelected
                      ? "0px 4px 8px rgba(0,0,0,0.15)"
                      : "none",
                    zIndex: isSelected ? 1 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  onClick={() => handleTeamClick(team)}
                  style={{
                    minWidth: 160,
                    height: 50,
                    margin: "0 6px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 12,
                    padding: 12,
                    border: `1px solid ${isSelected ? theme.palette.primary.main : "transparent"}`,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        mr: 1,
                        fontSize: "0.75rem",
                        bgcolor: isSelected
                          ? alpha(theme.palette.primary.contrastText, 0.3)
                          : theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      {team.name.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        fontWeight: isSelected ? 500 : 400,
                        maxWidth: 100,
                        fontSize: "0.8rem",
                      }}
                    >
                      {team.name}
                    </Typography>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </motion.div>

        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "60px",
            background: `linear-gradient(to left, ${theme.palette.background.paper}, transparent)`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </Box>
    );
  };

  const renderContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;

    const teamOptions = data.Team.map((team) => ({
      label: team.name,
      id: team.id,
    }));

    return (
      <>
        <TeamScrollbar teams={data.Team} />

        <Paper
          elevation={1}
          sx={{
            p: 1.5,
            mb: 3,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon color="action" sx={{ ml: 1, mr: 1.5, fontSize: 20 }} />
          <Autocomplete
            disablePortal
            options={teamOptions}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Teams"
                variant="standard"
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "transparent",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: alpha(theme.palette.primary.main, 0.3),
                  },
                  "& .MuiInputLabel-root": { fontSize: "0.85rem" },
                }}
              />
            )}
            onChange={handleTeamChange}
            value={
              selectedTeam
                ? { label: selectedTeam.name, id: selectedTeam.id }
                : null
            }
          />
        </Paper>

        {selectedTeam ? (
          <TeamDetails team={selectedTeam} />
        ) : (
          <NoTeamSelected />
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor:
          theme.palette.mode === "light"
            ? alpha(theme.palette.primary.light, 0.05)
            : theme.palette.background.default,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ minHeight: "60px" }}>
          <Box display="flex" alignItems="center">
            <GavelIcon
              sx={{ mr: 1.5, color: theme.palette.primary.main, fontSize: 24 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
            >
              Judges Dashboard
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleLogout}
            startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
            sx={{ borderRadius: 1.5, fontSize: "0.8rem" }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          p: 1.5,
          bgcolor: "background.paper",
          textAlign: "center",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} CSI-KJSCE
        </Typography>
      </Box>
    </Box>
  );
};

export default JudgesDashboard;
