import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SUBMISSIONS_QUERY } from "../queries";

function SubmissionsAdminPopupContent({ data, setSubmissionPopup }) {
  const [updateSubmission] = useMutation(SUBMISSIONS_QUERY);

  const handleValidClick = async () => {
    try {
      const response = await updateSubmission({
        variables: {
          id: data.id,
          submissions: { ...data.submission, valid: true }, // Set submission as valid
        },
      });
      console.log("Valid Submission Updated:", response);
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  const handleNotValidClick = async () => {
    try {
      const response = await updateSubmission({
        variables: {
          id: data.id,
          submissions: { ...data.submission, valid: false }, // Set submission as not valid
        },
      });
      console.log("Not Valid Submission Updated:", response);
    } catch (error) {
      console.error("Error updating submission:", error);
    }
  };

  return (
    <Box
      sx={{
        scrollbarWidth: "thin",
        px: 1,
        pt: { xs: 3, md: 1 },
      }}
    >
      <Box>
        <iframe
          src={data.submission.ppt}
          frameborder="0"
          width="100%"
          height="480px"
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to={data.submission.video} target="_blank">
            <Button variant="contained" sx={{ mt: 2 }}>
              Watch video
            </Button>
          </Link>
          <Link to={data.submission.ppt} target="_blank">
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
          <Button
            variant="contained"
            sx={{ bgcolor: "red" }}
            onClick={() => {
              handleNotValidClick();
              setSubmissionPopup(false);
            }} // Trigger Not Valid status
          >
            <Typography variant="button">Not Valid</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "green" }}
            onClick={() => {
              handleValidClick();
              setSubmissionPopup(false);
            }} // Trigger Valid status
          >
            <Typography variant="button">Valid</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default SubmissionsAdminPopupContent;
