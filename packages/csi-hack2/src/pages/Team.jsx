import { useContext, useState } from "react";
import UserDataContext from "../contexts/userDataContext";
import { Navigate } from "react-router";
import HeaderBox from "../elements/HeaderBox";
import {
  Box,
  Typography,
  Grid2,
  useTheme,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import TeamDetails from "../components/TeamDetails";
import RegisterSteps from "../components/RegisterSteps";
import timeline from "../assets/timeline.png";

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
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <HeaderBox header={"Team Name: " + eventData.Participant.team.name}>
          <TeamDetails
            setShowSnackBar={setShowSnackBar}
            setSnackBarMessage={setSnackBarMessage}
          />
        </HeaderBox>
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
