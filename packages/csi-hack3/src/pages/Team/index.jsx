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
  useMediaQuery,
} from "@mui/material";
import TeamDetails from "./TeamDetails";
import RegisterSteps from "./RegisterSteps";
import timeline from "../../assets/carousel/desktop/timeline.png";
import timelineMobile from "@assets/carousel/mobile/timeline.png";

const Team = () => {
  const { userData, eventData } = useContext(UserDataContext);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:900px)");

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
            <ol>
              <li>Only the team leader is required to submit the PPT template.</li>
              <li>The template provided is to be followed as is.</li>
              <li>The solution must <strong>not exceed 8 slides,</strong> i.e, 1 Header slide + 1 Team Details slide + 6 content slides.</li>
              <li>The slide titles must be retained as it is, and their positions should not be changed.</li>
              <li>The headings for the submission must not be changed.</li>
              <li>The content can be structured around the heading in any manner.</li>
              <li>There is no restriction with regards to the fonts, as long as it is legible.</li>
              <li>For flowcharts and other diagrams, other fonts can be utilized.</li>
              <li>One page summary is compulsary (as required in research and references slide)</li>
              <li><strong>Once the idea PPT (in PDF Format) is submitted, no resubmission is possible (under any circumstances).</strong></li>
              <li>Incorporate flowcharts and diagrams when required within the given space.</li>
            </ol>
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
          <img width="100%" src={isMobile ? timelineMobile : timeline} alt=""  style={{borderRadius:"8px"}}/>
        </HeaderBox>
      </Grid2>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={() => setShowSnackBar(false)}
        message={snackBarMessage}
      />
    </Grid2 >
  );
};

export default Team;
