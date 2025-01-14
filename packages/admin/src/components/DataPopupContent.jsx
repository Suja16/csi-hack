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
const teamData = {
  teamName: "Code Crushers",
  approved: true,
  teamLeader: "Alice Johnson",
  members: [
    {
      name: "Alice Johnson",
      photo: "https://via.placeholder.com/150",
      resumeUrl: "https://example.com/alice-resume.pdf",
      techStack: ["Java", "React.js", "MySQL"],
      linkedinUrl: "https://linkedin.com/in/alice-johnson",
      githubUrl: "https://github.com/alice-johnson",
      whyHackathon: "To challenge myself and learn new technologies.",
    },
    {
      name: "Bob Smith",
      photo: "https://via.placeholder.com/150",
      resumeUrl: "https://example.com/bob-resume.pdf",
      techStack: ["Python", "Django", "PostgreSQL"],
      linkedinUrl: "https://linkedin.com/in/bob-smith",
      githubUrl: "https://github.com/bob-smith",
      whyHackathon: "To collaborate with other passionate developers.",
    },
    {
      name: "Charlie Brown",
      photo: "https://via.placeholder.com/150",
      resumeUrl: "https://example.com/charlie-resume.pdf",
      techStack: ["JavaScript", "Node.js", "MongoDB"],
      linkedinUrl: "https://linkedin.com/in/charlie-brown",
      githubUrl: "https://github.com/charlie-brown",
      whyHackathon: "To build something innovative and impactful.",
    },
  ],
};

const TeamDetailsPage = ({ teamData }) => {
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#00579c", ml: -0.5 }}
          gutterBottom
        >
          {teamData.teamName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          <strong>Approved </strong>: {teamData.approved ? "Yes" : "No"}
        </Typography>
        <Typography variant="h5" gutterBottom>
          <strong>Team Leader </strong>: {teamData.leaderName}
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Team Members
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {teamData.teamMembers.map((member, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img width="200px" src={member.photo} alt="Team Member" />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {member.TechStack.split(", ").map((tech, techIndex) => (
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
                    href={member.linkedin}
                    target="_blank"
                    size="large"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    color="primary"
                    component="a"
                    href={member.github}
                    target="_blank"
                    size="large"
                    rel="noopener noreferrer"
                  >
                    <GitHub />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Why this hackathon:</strong>{" "}
                  {member.why_this_hackathon}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Description />}
                  component="a"
                  href={member.resume}
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
              <TableCell>Technology</TableCell>
              <TableCell align="right">Number of Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(
              teamData.teamMembers
                .flatMap((m) => m.TechStack.split(", "))
                .reduce(
                  (acc, tech) => ({
                    ...acc,
                    [tech]: (acc[tech] || 0) + 1,
                  }),
                  {}
                )
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
