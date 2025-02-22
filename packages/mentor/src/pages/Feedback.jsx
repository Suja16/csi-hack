import { useParams } from "react-router";
import { Box, Typography } from "@mui/material";

function Feedback() {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4">Feedback for Team {id}</Typography>
    </Box>
  );
}

export default Feedback;
