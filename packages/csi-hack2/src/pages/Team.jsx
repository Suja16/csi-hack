import { useContext } from "react";
import UserDataContext from "../contexts/userDataContext";
import { Navigate } from "react-router";
import HeaderBox from "../elements/HeaderBox";
import { Box, Typography, Grid2, useTheme } from "@mui/material";
import TeamDetails from "../components/TeamDetails";
import RegisterSteps from "../components/RegisterSteps";

const Team = () => {
  const { userData, eventData } = useContext(UserDataContext);
  const theme = useTheme();
  if (userData===null || eventData===null) {
    return <Navigate to="/" />;
  }

  if (!userData || !eventData) {
    return <Box>Loading...</Box>;
  }

  return (
    <Grid2 container columns={2} spacing={2} bgcolor={theme.palette.background.main} minHeight="100vh" padding="2rem">
      <Grid2 item size={1}>
        <HeaderBox header={"Team Name: " + eventData.Participant.team.name}>
          <TeamDetails />
        </HeaderBox>
      </Grid2>
      <Grid2 item size={1}>
        <HeaderBox header="Steps to Register">
          <RegisterSteps />
        </HeaderBox>
      </Grid2>
      <Grid2 item size={2}>
        <HeaderBox header="Event">
          {/* {eventData && (<Typography>{JSON.stringify(eventData, null, 2)}</Typography>)} */}
          Hi
        </HeaderBox>
      </Grid2>
    </Grid2>
  );
}

export default Team;
