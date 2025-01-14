import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value }) => {
  return (
    <Card sx={{ width: '20rem', height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h4" component="div">
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
        <StatsCard title="Stat 1" value="100" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Stat 2" value="200" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StatsCard title="Stat 3" value="300" />
      </Grid>
    </Grid>
  );
};

export default StatsGrid;