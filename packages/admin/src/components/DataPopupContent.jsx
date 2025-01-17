import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { LinkedIn, GitHub, Description } from "@mui/icons-material";

// Sample data (replace with your actual data)

const TeamDetailsPage = ({ teamData }) => {
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#00579c", ml: -0.5 }}
          gutterBottom
        >
          {teamData.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Approved </strong>: {teamData.approved ? "Yes" : "No"}
        </Typography>
        <Typography variant="h5" gutterBottom>
          <strong>Team Leader </strong>: {teamData.Leader?.name}
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Team Members
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {teamData.Participants?.map((member, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ minHeight: { md: 650 } }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  width="200px"
                  src={member.User?.photo_url}
                  alt="Team Member"
                />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {member.more_details?.tech_stack
                    ?.split(", ")
                    .map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <IconButton
                    color="primary"
                    component="a"
                    href={member.more_details?.linkedin}
                    target="_blank"
                    size="large"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    color="primary"
                    component="a"
                    href={member.more_details?.github}
                    target="_blank"
                    size="large"
                    rel="noopener noreferrer"
                  >
                    <GitHub />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Why this hackathon:</strong>{" "}
                  {member.more_details?.why_this_hackathon}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Description />}
                  component="a"
                  href={member.more_details?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Tech Stack Overview
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Technology</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: "right" }}>
                Number of Members
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              teamData.Participants.flatMap((m) =>
                m.more_details?.tech_stack?.split(", "),
              ).reduce(
                (acc, tech) => ({
                  ...acc,
                  [tech]: (acc[tech] || 0) + 1,
                }),
                {},
              ),
            ).map(([tech, count]) => (
              <TableRow key={tech}>
                <TableCell component="th" scope="row">
                  {tech}
                </TableCell>
                <TableCell align="right">{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamDetailsPage;
