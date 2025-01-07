import React from "react";
// import TimelineCard from "./TimelineCard";
import TimelineCard from "./LgTimeLineCard";
import { Box, Typography } from "@mui/material";

const EventTimeline = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        bgcolor: "transparent",
      }}
    >
      <Box sx={{ width: "98%", textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Bai Jamjuree, sans-serif",
            fontWeight: "medium",
            color: "white",
          }}
        >
          PROCESS FLOW + TIMELINE
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          paddingLeft: "20px",
        }}
      >
        {/* Event 1 */}
        <Box sx={{ position: "relative", marginBottom: "7px" }}>
          <TimelineCard number={1} text="Problem Statement Launch" />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "76.5%",
              width: "100px",
              height: "412px",
              borderLeft: "0px",
              borderRight: "4px solid white ",
              borderBottom: "0px",
              borderTop: "4px solid white",
              borderTopRightRadius: "30px",
              borderStyle: "dashed",
            }}
          />
        </Box>

        {/* Event 2 */}
        <Box sx={{ position: "relative", marginBottom: "7px", paddingLeft: "200px" }}>
          <TimelineCard number={2} text="Registration Begins" />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "calc(100% - 12.4em)",
              width: "100px",
              height: "412px",
              borderLeft: "4px solid white",
              borderTop: "4px solid white",
              borderRight:"0px",
              borderTopLeftRadius: "30px",
              borderBottom:"0px",
              borderStyle: "dashed",
            }}
          />
        </Box>

        {/* Event 3 */}
        <Box sx={{ position: "relative", marginBottom: "7px" }}>
          <TimelineCard number={3} text="Registration Ends" />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "76.5%",
              width: "100px",
              height: "412px",
              borderLeft: "0px",
              borderRight: "4px solid white ",
              borderBottom: "0px",
              borderTop: "4px solid white",
              borderTopRightRadius: "30px",
              borderStyle: "dashed",
            }}
          />
        </Box>

        {/* Event 4 */}
        <Box sx={{ marginBottom: "7px", paddingLeft: "200px" }}>
          <TimelineCard number={4} text="Submission Deadline" />
        </Box>
      </Box>
    </Box>
  );
};

export default EventTimeline;
