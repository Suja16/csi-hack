import { useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Box, Button, Paper, Typography, Link, Container, Chip, IconButton, Tooltip, Stack } from "@mui/material";
import YouTube from "react-youtube";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import NewEevaluatorsInput from "../components/NewEevaluatorsInput";
import TeamsContext from "../contexts/teamsContext";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allTeams, nonEvaluatedTeams } = useContext(TeamsContext);

  const selectedTeam = useMemo(() => {
    const team = allTeams[id]?.team_info_from_eventio;
    if (!team) return {};

    const youtube = team.submissions?.video;
    const videoId = youtube?.match(
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )?.[1];

    return {
      name: team.name,
      youtube,
      videoId,
      ppt: team.submissions?.ppt,
      metric_score: allTeams[id]?.metric_score,
      totalscore: allTeams[id]?.totalscore,
    };
  }, [allTeams, id]);

  const handleNavigation = (direction) => {
    const keys = Object.keys(nonEvaluatedTeams);
    const index = keys.indexOf(id);
    const newIndex =
      direction === "next" ? (index === keys.length - 1 ? 0 : index + 1) : index <= 0 ? keys.length - 1 : index - 1;
    navigate(`/teams/${keys[newIndex]}`);
  };

  const ContentSection = ({ title, onClick, children }) => (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
        {onClick && (
          <Tooltip title="Open in new tab">
            <Button color="primary" onClick={onClick}>
              Open in new tab
            </Button>
          </Tooltip>
        )}
      </Stack>
      {children}
    </Paper>
  );

  if (!selectedTeam.youtube) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" gap={4}>
          <Typography variant="h4">This team has not made a submission yet.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h4">{selectedTeam.name}</Typography>
        {selectedTeam.totalscore && <Chip label="Evaluated" color="success" sx={{ maxWidth: 100 }} />}
      </Stack>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} sx={{ mb: 2 }}>
        <Box flex={7} display="flex" flexDirection="column" gap={2}>
          <ContentSection title="Presentation" onClick={() => window.open(selectedTeam.ppt)}>
            <Box sx={{ height: 480 }}>
              <iframe
                src={selectedTeam.ppt}
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allowFullScreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
              />
            </Box>
          </ContentSection>

          <ContentSection title="Submission Video" onClick={() => window.open(selectedTeam.youtube, "_blank")}>
            {selectedTeam.videoId ? (
              <Box sx={{ width: "100%", paddingTop: "56.25%", position: "relative" }}>
                <YouTube
                  videoId={selectedTeam.videoId}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: { autoplay: 0 },
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            ) : selectedTeam.youtube.includes("drive.google.com") ? (
              <Box sx={{ height: 480 }}>
                <iframe
                  src={selectedTeam.youtube}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allowFullScreen
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                />
              </Box>
            ) : (
              <Link href={selectedTeam.youtube} target="_blank">
                {selectedTeam.youtube}
              </Link>
            )}
          </ContentSection>
        </Box>

        <Box flex={5}>
          <ContentSection title="Evaluation">
            <NewEevaluatorsInput />
          </ContentSection>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Button
            color="primary"
            variant="contained"
            startIcon={<NavigateBefore />}
            onClick={() => handleNavigation("prev")}
          >
            Previous Team
          </Button>
          <Button
            color="primary"
            variant="contained"
            endIcon={<NavigateNext />}
            onClick={() => handleNavigation("next")}
          >
            Next Team
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TeamDetails;
