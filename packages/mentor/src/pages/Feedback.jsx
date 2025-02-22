import { useParams, useNavigate } from "react-router";
import { Box, Button, Typography, TextareaAutosize } from "@mui/material";
import { useQuery } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import { TEAM_QUERY } from "../queries";
import Header from "../components/Header";

function Feedback() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useQuery(TEAM_QUERY, {
    variables: { id: parseInt(id) },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box padding={2}>
      <Header />
      <Box display="flex" marginY={2} alignItems="center">
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          sx={{ "& .MuiButton-startIcon": { marginRight: "0px" } }}
          onClick={() => navigate("/")}
        />

        <Typography variant="h5">
          Feedback for Team {data.Team[0].name}
        </Typography>
      </Box>
      <TextareaAutosize
        minRows={10}
        placeholder="Enter your feedback here"
        style={{ width: "100%" }}
      />
    </Box>
  );
}

export default Feedback;
