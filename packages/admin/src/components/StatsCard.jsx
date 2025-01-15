import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import GenderIcon from '@mui/icons-material/Wc';

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ width: '20rem', height: '100%', borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        avatar={React.cloneElement(icon, { sx: { color: 'text.secondary' } })}
        title={title}
        titleTypographyProps={{ variant: 'h6', align: 'left', color: 'textSecondary' }}
      />
      <CardContent>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StatsGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Teams Registered" value="100" icon={<PeopleIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Submissions Made" value="200" icon={<AssignmentIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Number of Evaluators" value="50" icon={<InfoIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Teams Evaluated" value="75" icon={<AssignmentIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Number of Colleges" value="30" icon={<SchoolIcon />} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Male Female Ratio" value="60:40" icon={<GenderIcon />} />
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