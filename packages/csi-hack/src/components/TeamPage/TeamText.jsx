import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamText = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Fetch team data from the API
    const fetchTeamData = async () => {
      try {
        const response = await axios.post(`https://api.csi-kjsce.org/api/v1/event/p/get/47`, {}, {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setTeamData(response.data.event.Participant.team); // Set the team data to state
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  // If the team data is not yet loaded, show a loading message
  if (!teamData) {
    return <Typography>Loading team data...</Typography>;
  }
  return (
    <Box
      sx={{
        padding: "0.5em",
        display: "flex",
        flexDirection: "column",
        maxWidth: "50em", // Ensures responsiveness

      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Team Name */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontSize: "1.2em" }}
        >
          {teamData.name}
        </Typography>
        {/* Submit PPT Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E41D22",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "0.8em",
            padding: "0.4em 0.8em",
            borderRadius: "0.5em",
            "&:hover": { backgroundColor: "#D0181E" },
          }}
        >
          Submit PPT
        </Button>
      </Box>

      {/* Link Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#6c6c6c",
          cursor: "pointer",
        }}
      >
        <InsertLinkIcon fontSize="small" />
        <Typography
          variant="body2"
          sx={{ textDecoration: "underline", fontSize: "0.8em" }}
        >
          link to join
        </Typography>
      </Box>

      {/* RSVP Section */}
      {/* <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ color: "#1F3A93", fontSize: "1em" }}
      >
        WILL YOU ATTEND THE HACKATHON?
      </Typography> */}
      {/* <Box
        sx={{
          display: "flex",
          gap: "0.4em",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{
            color: "green",
            fontSize: "1.6em",
          }}
        >
          <CheckCircleIcon fontSize="medium" />
        </IconButton>
        <IconButton
          sx={{
            color: "red",
            fontSize: "1.6em",
          }}
        >
          <CancelIcon fontSize="medium" />
        </IconButton>
      </Box> */}

      {/* Team Members List */}
      <Stack spacing={1.5}>
        {teamData.Participant.map((member, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "0.08em solid #E41D22",
              borderRadius: "0.4em",
              padding: "0.6em",
            }}
          >
            {/* Member Name */}
            <Typography
              variant="body1"
              sx={{ fontSize: "0.9em", fontWeight: "500" }}
            >
              {member.user.name}
            </Typography>
            {/* RSVP Status */}
            <Typography
              variant="body2"
              sx={{
                color: "#E41D22",
                fontWeight: "bold",
                fontSize: "0.8em",
              }}
            >
              RSVP PENDING
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TeamText;
