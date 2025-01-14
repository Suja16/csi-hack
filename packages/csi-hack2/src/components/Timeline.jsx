import React from 'react';
import timeline from "../assets/timeline.png"
import { Box, useMediaQuery, Typography } from "@mui/material";

function Timeline(props) {
  const isMobile = useMediaQuery("(max-width:500px)")
  return (
    <Box sx={{
      width: "100%",
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: "column",
      gap: 1,
      marginTop: "2rem",
      marginBottom: isMobile ? null : "5rem",
      objectFit: "cover",
    }}>

      <Typography
        variant={isMobile ? "h3" : "h2"}
        align="center"
        sx={{
          fontWeight: 700,
          mt: { xs: 6, md: 8 },
          mb: { xs: 4, md: 6 },
          color: "text.primary",
        }}
      >
        Timeline</Typography>
      <img width="100%" src={timeline} alt="" />
    </Box>
  );
}

export default Timeline;
