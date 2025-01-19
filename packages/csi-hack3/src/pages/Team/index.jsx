import { useContext, useState } from "react";
import UserDataContext from "../../contexts/userDataContext";
import { Navigate } from "react-router";
import HeaderBox from "../../components/HeaderBox";
import {
  Box,
  Typography,
  Grid2,
  useTheme,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import TeamDetails from "./TeamDetails";
import RegisterSteps from "./RegisterSteps";
import timeline from "../../assets/carousel/desktop/timeline.png";

const Team = () => {
  const { userData, eventData } = useContext(UserDataContext);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const theme = useTheme();
  console.log(eventData);
  if (
    userData === null ||
    eventData === null ||
    (eventData && !eventData.Participant)
  ) {
    return <Navigate to="/" />;
  }

  if (!userData || !eventData) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress margin="auto" />
      </Box>
    );
  }

  return (
    <Grid2
      container
      spacing={2}
      bgcolor={theme.palette.background.main}
      minHeight="100vh"
      padding="2rem"
    >
      <Grid2 item container spacing={1} size={{ xs: 12, md: 6 }}>
        <Grid2 item size={12}>
          <HeaderBox header={"Team Name: " + eventData.Participant.team.name}>
            <TeamDetails
              setShowSnackBar={setShowSnackBar}
              setSnackBarMessage={setSnackBarMessage}
            />
          </HeaderBox>
        </Grid2>
        <Grid2 item size={12}>
          <HeaderBox header={"Important Instructions"}>
            <Typography variant="overline">
              * Only the team leader is required to submit the PPT template.<br />
              * The submission must be in PDF Format.<br />
              * The submission must be in the template as provided by the organiser.<br />
              * The submission should not exceed 7 slides.<br />
              * The header slide must be included in the submission.<br />
              * The utilisation of space is up to the discretion of the participants, so long as it is visible for evaluators to read and understand.<br />
              * The font size must not be less than 18 points and must be in Marcellus font.<br />
            </Typography>
          </HeaderBox>
        </Grid2>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <HeaderBox header="Steps to Register">
          <RegisterSteps />
        </HeaderBox>
      </Grid2>
      <Grid2 item size={12}>
        <HeaderBox header="Event Timeline">
          <img width="100%" src={timeline} alt="" />
        </HeaderBox>
      </Grid2>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => setShowSnackBar(false)}
        message={snackBarMessage}
      />
    </Grid2>
  );
};

export default Team;
