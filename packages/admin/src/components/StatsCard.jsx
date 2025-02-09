import { useQuery } from "@apollo/client";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import GenderIcon from "@mui/icons-material/Wc";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import React from "react";
import { STATS_QUERY } from "../queries";

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card
      sx={{ width: "20rem", height: "100%", borderRadius: 2, boxShadow: 3 }}
    >
      <CardHeader
        avatar={React.cloneElement(icon, { sx: { color: "text.secondary" } })}
        title={title}
        titleTypographyProps={{
          variant: "h6",
          align: "left",
          color: "textSecondary",
        }}
      />
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StatsGrid = () => {
  const { data, loading, error } = useQuery(STATS_QUERY);
  // console.log("Data : ", data);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const teamCount = data?.Team?.length ?? 0;
  const submissionCount =
    data?.Team?.filter((team) => Boolean(team.submissions)).length ?? 0;
  const evaluatorCount = data?.Idea_USERS_aggregate?.aggregate?.count ?? 0;
  // const teamEvaluated =
  //   data?.feedbacks_aggregate?.aggregate?.count_evaluated ?? 0;

  const teamEvaluated = (data?.Team.filter(
    (team) => team.submissions && team.feedbacks_from_idea?.length === 2
  )).length;

  const allWomenTeam = data?.Team.filter(
    (team) =>
      team.Participants.length === 4 &&
      team.Participants.every(
        (participant) => participant.User.gender === "FEMALE"
      )
  ).length;
  const maleCount = data?.Team?.reduce(
    (acc, team) =>
      acc +
      (team.Participants.length === 4
        ? team.Participants.filter(
            (participant) => participant.User.gender === "MALE"
          ).length
        : 0),
    0
  );
  const femaleCount = data?.Team?.reduce(
    (acc, team) =>
      acc +
      (team.Participants.length === 4
        ? team.Participants.filter(
            (participant) => participant.User.gender === "FEMALE"
          ).length
        : 0),
    0
  );
  const finTech = data?.Team.filter(
    (team) => team.submissions && team.submissions.domain === "FINTECH"
  ).length;
  const cyberSecurity = data?.Team.filter(
    (team) => team.submissions && team.submissions.domain === "CYBERSECURITY"
  ).length;
  const genAI = data?.Team.filter(
    (team) => team.submissions && team.submissions.domain === "GENAI"
  ).length;

  const consentUploaded = data?.Team.filter(
    (team) => team.submissions && team.submissions.consent
  ).length;
  const consentNotUploaded = submissionCount - consentUploaded;

  // Calculate the male-female ratio
  const maleFemaleRatio =
    maleCount && femaleCount
      ? `${(maleCount / femaleCount).toFixed(2)}:1`
      : "Data not available";

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Teams Registered"
          value={teamCount}
          icon={<PeopleIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Submissions Made"
          value={submissionCount}
          icon={<AssignmentIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Number of Evaluators"
          value={evaluatorCount} // Static for now, replace with actual data if available
          icon={<InfoIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Teams Evaluated"
          value={teamEvaluated} // Static for now, replace with actual data if available
          icon={<AssignmentIcon />}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Number of Colleges"
          value="30" // Static for now, replace with actual data if available
          icon={<SchoolIcon />}
        />
      </Grid> */}
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Male Female Ratio"
          value={maleFemaleRatio} // Static for now, replace with actual data if available
          icon={<GenderIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="All Women Teams"
          value={allWomenTeam} // Static for now, replace with actual data if available
          icon={<GenderIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="FINTECH"
          value={finTech}
          icon={<MonetizationOnIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="CYBERSECURITY"
          value={cyberSecurity}
          icon={<SecurityIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="GenAI" value={genAI} icon={<SmartToyIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Consent Uploaded"
          value={consentUploaded}
          icon={<CheckCircleIcon />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard
          title="Consent Skipped"
          value={consentNotUploaded}
          icon={<CancelIcon />}
        />
      </Grid>
    </Grid>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
};

export default StatsGrid;
