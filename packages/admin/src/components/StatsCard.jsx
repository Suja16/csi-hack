import { useQuery } from "@apollo/client";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import GenderIcon from "@mui/icons-material/Wc";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
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
  console.log(data);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const teamCount = data?.Team_aggregate?.aggregate?.count ?? 0;
  const submissionCount =
    data?.Team_aggregate?.aggregate?.count_submissions ?? 0;
  const evaluatorCount = data?.Idea_USERS_aggregate?.aggregate?.count ?? 0;
  const teamEvaluated =
    data?.feedbacks_aggregate?.aggregate?.count_evaluated ?? 0;
  const allWomenTeam = data?.female_team_count?.aggregate?.count ?? 0;
  const maleCount = data.maleCount.aggregate.count;
  const femaleCount = data.femaleCount.aggregate.count;

  // Calculate the male-female ratio
  const maleFemaleRatio =
    maleCount && femaleCount
      ? `${maleCount}:${femaleCount}`
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
          title="Teams with females"
          value={allWomenTeam} // Static for now, replace with actual data if available
          icon={<GenderIcon />}
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
