import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, redirect } from "react-router-dom";

function SubmissionsAdminPopupContent({ data }) {
  // {ppt, valid, video, domain, consent, acceptance}
  return (
    <Box
      sx={{
        scrollbarWidth: "thin",
        px: 1,
        pt: { xs: 3, md: 1 },
      }}
    >
      <Box>
        <iframe src={data.ppt} frameborder="0" width="100%" height="480px" />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={data.video} target="_blank">
            <Button variant="contained" sx={{ mt: 2 }}>
              Watch video
            </Button>
          </Link>
          <Link to={data.ppt} target="_blank">
            <Button variant="contained" sx={{ mt: 2 }}>
              Watch Full ppt
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            gap: 3,
            mt: 3,
            borderTop: "0.5px solid gray",
            pt: 1,
          }}
        >
          <Button variant="contained" sx={{ bgcolor: "red" }}>
            <Typography variant="button">Not Valid</Typography>
          </Button>
          <Button variant="contained" sx={{ bgcolor: "green" }}>
            <Typography variant="button">Valid</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionsAdminPopupContent;
