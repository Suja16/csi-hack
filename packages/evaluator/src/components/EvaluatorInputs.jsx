import React, { useState, useEffect } from "react";
import { useTeams } from "../context/teamsContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputLabel,
} from "@mui/material";

const outOf20List = [
  { name: "Novelty of Proposed Solution", maxScore: 20 },
  { name: "Methodology", maxScore: 20 },
  { name: "Technology Stack", maxScore: 20 },
];

const outOf10List = [
  { name: "Feasibility", maxScore: 10 },
  { name: "Complexity", maxScore: 10 },
  { name: "Overall Team Composition", maxScore: 10 },
  { name: "Presentation Skills", maxScore: 10 },
];

const HackathonEvaluator = () => {
  const { teams, selectedTeam, setSelectedTeam } = useTeams();
  const queryParams = new URLSearchParams(location.search);
  const teamID = queryParams.get("team");
  const details = teams.find((team) => team.id === Number(teamID));

  const [scores, setScores] = useState(
    [...outOf20List, ...outOf10List].reduce(
      (acc, criteria) => ({
        ...acc,
        [criteria.name]: "",
      }),
      {}
    )
  );
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const newTotal = Object.values(scores).reduce(
      (sum, score) => sum + (parseInt(score) || 0),
      0
    );
    setTotalScore(newTotal);
  }, [scores]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted scores:", scores);
    console.log("Total score:", totalScore);
  };

  const ScoreInput = ({ criteria, spacing, marginToVal }) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: "left",
          pr: 2,
          pt: 1,
          fontWeight: 600,
          width: spacing,
        }}
      >
        {criteria.name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          required
          sx={{ width: "60px", mt: marginToVal ? marginToVal : 0 }}
          variant="outlined"
          value={scores[criteria.name]}
          onChange={(e) => handleScoreChange(criteria.name, e.target.value)}
          placeholder="0"
          size="small"
        />
        <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
          /{criteria.maxScore}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "80%",
        height: "max-content",

      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          sx={{
            mt: 3,
            mb: 1,
          }}
        >
          {selectedTeam.name} Evaluation scores
        </Typography>

        <Box
          sx={{
            height: "max-content",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
            py: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: { xs: "100%", lg: 500 },
              height: 380,
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                height: "90%",
                px: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {outOf10List.map((criteria) => (
                <ScoreInput
                  key={criteria.name}
                  spacing="270px"
                  criteria={criteria}
                />
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              width: { xs: "100%", lg: 540 },
              height: 380,
              pt: { xs: 2, lg: 0 },
              borderRadius: "4px",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
                px: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                px: 5,
              }}
            >
              {outOf20List.map((criteria) => (
                <ScoreInput
                  key={criteria.name}
                  spacing={{ xs: "160px", lg: "300px" }}
                  marginToVal={{ xs: 2, lg: 1 }}
                  criteria={criteria}
                />
              ))}
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: { xs: "100%", lg: "80%" },
            mx: "auto",
          }}
        >
          <Typography variant="h5">
            Total Score: {totalScore}/
            {[...outOf20List, ...outOf10List].reduce(
              (sum, criteria) => sum + criteria.maxScore,
              0
            )}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#ee1f25",
              "&:hover": {
                bgcolor: "#d31920",
              },
            }}
            size="medium"
          >
            Submit Evaluation
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default HackathonEvaluator;
