import { useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Box,
  Button,
  Paper,
  Typography,
  Link,
  useMediaQuery,
} from "@mui/material";
import YouTube from "react-youtube";
import NewEevaluatorsInput from "../components/NewEevaluatorsInput";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import TeamsContext from "../contexts/teamsContext";

const TeamDetails = () => {
  const { id } = useParams();
  const { allTeams, nonEvaluatedTeams } = useContext(TeamsContext);
  const navigate = useNavigate();

  const selectedTeam = useMemo(() => {
    const data = {};
    data.name = allTeams[id]?.team_info_from_eventio.name;
    data.youtube = allTeams[id]?.team_info_from_eventio.submissions?.video;
    data.ppt = allTeams[id]?.team_info_from_eventio.submissions?.ppt;
    data.metric_score = allTeams[id]?.metric_score;
    data.totalscore = allTeams[id]?.totalscore;

    if (!data.youtube) {
      data.videoId = null;
      return data;
    }
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = data.youtube.match(regex);
    data.videoId = match ? match[1] : null;

    return data;
  }, [allTeams, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // wont work for some reason
  }, [id]);

  const isMobile = useMediaQuery("(max-width:600px)");

  const videoOpts = {
    height: isMobile ? 360 : 460,
    width: "97%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (!selectedTeam.youtube) {
    return (
      <Box>
        <Typography variant="h4">
          This team has not made a submission yet.
        </Typography>
        <Box display="flex" justifyContent="space-between" padding={2}>
          <Button
            color="primary"
            variant="contained"
            sx={{
              p: 2,
            }}
            onClick={() => {
              const keys = Object.keys(nonEvaluatedTeams);
              const index = keys.indexOf(id);
              if (!index) {
                navigate(`/teams/${keys[keys.length - 1]}`);
              } else if (index === 0) {
                navigate(`/teams/${keys[keys.length - 1]}`);
              } else {
                navigate(`/teams/${keys[index - 1]}`);
              }
            }}
          >
            Previous Team
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{
              p: 2,
            }}
            onClick={() => {
              const keys = Object.keys(nonEvaluatedTeams);
              const index = keys.indexOf(id);
              if (index === keys.length - 1) {
                navigate(`/teams/${keys[0]}`);
              } else {
                navigate(`/teams/${keys[index + 1]}`);
              }
            }}
          >
            Next Team
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          paddingBottom: 3,
          // marginLeft: 3,
        }}
      >
        {selectedTeam.totalscore && (
          <Typography variant="h4">
            This team has already been evaluated.
          </Typography>
        )}
        {selectedTeam.youtube && (
          <>
            {selectedTeam.videoId ? (
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "space-around",
                  gap: 1,
                  height: isMobile ? 440 : 540,
                  width: "85%",
                }}
              >
                <Typography
                  variant="h5"
                  color="#ee1f25"
                  gutterBottom
                  component="div"
                >
                  YouTube Video
                </Typography>

                <YouTube
                  key={selectedTeam.id}
                  videoId={selectedTeam.videoId}
                  opts={videoOpts}
                />
              </Paper>
            ) : (
              <Box>
                <Typography
                  variant="h5"
                  color="#ee1f25"
                  pb={0.5}
                  component="div"
                >
                  Video URL
                </Typography>
                <Link href={selectedTeam.youtube} target="_blank">
                  {selectedTeam.youtube}
                </Link>
              </Box>
            )}

            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                width: "85%",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h5"
                  color="#ee1f25"
                  pb={0.5}
                  component="div"
                >
                  Presentation
                </Typography>
                <Typography
                  variant="a"
                  sx={{ cursor: "pointer" }}
                  onClick={() => window.open(selectedTeam.ppt)}
                >
                  <FullscreenIcon />
                </Typography>
              </Box>
              <Box>
                <iframe
                  src={selectedTeam.ppt}
                  frameBorder="0"
                  width="100%"
                  height={isMobile ? "400" : "600"}
                  allowFullScreen={true}
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                ></iframe>
              </Box>
            </Paper>
          </>
        )}
      </Box>
      {/* <HackathonEvaluatorInputs /> */}
      <NewEevaluatorsInput />
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Button
          color="primary"
          variant="contained"
          sx={{
            p: 2,
          }}
          onClick={() => {
            const keys = Object.keys(nonEvaluatedTeams);
            const index = keys.indexOf(id);
            if (index == -1) {
              navigate(`/teams/${keys[keys.length - 1]}`);
            } else if (index === 0) {
              navigate(`/teams/${keys[keys.length - 1]}`);
            } else {
              navigate(`/teams/${keys[index - 1]}`);
            }
          }}
        >
          Previous Team
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{
            p: 2,
          }}
          onClick={() => {
            const keys = Object.keys(nonEvaluatedTeams);
            const index = keys.indexOf(id);
            if (index === keys.length - 1) {
              navigate(`/teams/${keys[0]}`);
            } else {
              navigate(`/teams/${keys[index + 1]}`);
            }
          }}
        >
          Next Team
        </Button>
      </Box>
    </Box>
  );
};

export default TeamDetails;
