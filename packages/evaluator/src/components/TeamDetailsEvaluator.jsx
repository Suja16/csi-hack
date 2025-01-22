import { useContext } from "react";
import { useLocation } from "react-router-dom";
import TeamsContext from "../contexts/teamsContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import YouTube from "react-youtube";
import { useMediaQuery } from "@mui/material";
import NewEevaluatorsInput from "./NewEevaluatorsInput";
import CircularProgress from "@mui/material/CircularProgress";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const TeamDetails = () => {
  // const location = useLocation();
  const { teams, selectedTeam } = useContext(TeamsContext);
  console.log(selectedTeam);
  // const queryParams = new URLSearchParams(location.search);
  // const teamID = queryParams.get("team");
  // const details = teams?.find((team) => team.id === Number(teamID));
  // console.log(details);
  const isMobile = useMediaQuery("(max-width:600px)");

  const videoOpts = {
    height: isMobile ? 360 : 460,
    width: "97%",
    playerVars: {
      autoplay: 1,
    },
  };

  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!teams) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "60vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
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
          <Typography variant="h4" color="#ee1f25" gutterBottom component="div">
            YouTube Video
          </Typography>
          <YouTube
            videoId={getVideoId(selectedTeam.youtube)}
            opts={videoOpts}
          />
        </Paper>

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
            <Typography variant="h5" color="#ee1f25" pb={0.5} component="div">
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
      </Box>
      {/* <HackathonEvaluatorInputs /> */}
      <NewEevaluatorsInput />
    </Box>
  );
};

export default TeamDetails;
