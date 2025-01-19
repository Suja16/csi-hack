import React from "react";
import { useLocation } from "react-router-dom";
import { useTeams } from "../context/teamsContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import YouTube from "react-youtube";
import HackathonEvaluatorInputs from "./EvaluatorInputs";

const TeamDetails = () => {
  const location = useLocation();
  const { teams } = useTeams();

  const queryParams = new URLSearchParams(location.search);
  const teamID = queryParams.get("team");
  const details = teams.find((team) => team.id === Number(teamID));
  console.log(details);

  const videoOpts = {
    height: 460,
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

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          paddingBottom: 5,
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
            height: 540,
            width: "90%",
            minWidth: 300,
          }}
        >
          <Typography variant="h4" color="#ee1f25" gutterBottom component="div">
            YouTube Video
          </Typography>
          <YouTube videoId={getVideoId(details.youtube)} opts={videoOpts} />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            // height: 570,
            width: "90%",
            minWidth: 300,
            gap: 1,
          }}
        >
          <Typography variant="h4" color="#ee1f25" gutterBottom component="div">
            PowerPoint Presentation
          </Typography>
          <Box>
            <iframe
              src={details.ppt}
              frameBorder="0"
              width="100%"
              height="640"
              allowFullScreen={true}
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
            ></iframe>
          </Box>
        </Paper>
        <HackathonEvaluatorInputs />
      </Box>
    </Box>
  );
};

export default TeamDetails;
