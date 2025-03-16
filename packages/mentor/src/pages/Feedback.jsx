import { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Box, Button, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useQuery, useMutation } from "@apollo/client";
import { ArrowBack } from "@mui/icons-material";
import { TEAM_QUERY, INSERT_FEEDBACK } from "../queries";
import Header from "../components/Header";
import UserDataContext from "../contexts/userDataContext";
import { success } from "../utils/snackbar";

function Feedback() {
  const navigate = useNavigate();
  const { userData } = useContext(UserDataContext);
  const { id } = useParams();

  // Fetch team details
  const { data, loading, error } = useQuery(TEAM_QUERY, {
    variables: { id: parseInt(id) },
    onCompleted: (data) => {
      if (!data.Team[0]) {
        navigate("/");
      }
    },
  });

  // Mutation to submit feedback
  const [insertFeedback, { loading: mutationLoading }] = useMutation(
    INSERT_FEEDBACK,
    {
      onCompleted: async (_, { variables }) => {
        success("Feedback submitted successfully");

        // Send feedback email to the team leader
        const team = data?.Team[0];
        if (team) {
          const leaderEmail = team.Leader.email;
          const subject = `Feedback for Team ${team.name}`;
          const html = `
            <p>Dear ${team.name} Team Leader,</p>
            <p>Your team has received feedback from the mentor:</p>
            <blockquote>
              "${variables.remarks}"
            </blockquote>
            <p>We hope this helps improve your project.</p>
            <p>Sincerely,<br>CSI-KJSCE</p>
          `;

          try {
            await fetch("https://api.csi-kjsce.org/api/v1/mailer/send-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: leaderEmail,
                subject,
                html,
              }),
            });
          } catch (error) {
            console.error("Failed to send feedback email:", error);
          }
        }

        navigate("/");
      },
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;
    if (!feedback) {
      alert("Please enter feedback");
      return;
    }

    insertFeedback({
      variables: {
        team_id: data.Team[0].id,
        Idea_user_Id: userData.id,
        remarks: feedback,
      },
    });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box padding={2} component="form" onSubmit={handleSubmit}>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginY={2}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          sx={{ "& .MuiButton-startIcon": { marginRight: "0px" } }}
          onClick={() => navigate("/")}
        />
        <Typography
          variant="h5"
          noWrap
          style={{ display: "inline-block", whiteSpace: "pre-line" }}
        >
          Team {data.Team[0].name}
        </Typography>
      </Box>
      <TextField
        label="Feedback"
        name="feedback"
        placeholder="Enter your feedback here"
        multiline
        maxRows={8}
        minRows={4}
        fullWidth
      />
      <LoadingButton
        variant="contained"
        sx={{ marginY: 4 }}
        type="submit"
        loading={mutationLoading}
      >
        Submit
      </LoadingButton>
    </Box>
  );
}

export default Feedback;
