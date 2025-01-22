import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

function NewEevaluatorsInput() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [leftCriteria, setLeftCriteria] = useState([
    {
      name: "Feasibility",
      score: 8,
      maxScore: 10,
      description: "Evaluate the practical viability of implementation",
    },
    {
      name: "Complexity",
      score: 0,
      maxScore: 10,
      description: "Assess the technical complexity and scope",
    },
    {
      name: "Overall Team Composition",
      score: 0,
      maxScore: 10,
      description: "Rate the team's skills and collaboration",
    },
    {
      name: "Presentation Skills",
      score: 0,
      maxScore: 10,
      description: "Evaluate clarity and effectiveness of presentation",
    },
  ]);

  const [rightCriteria, setRightCriteria] = useState([
    {
      name: "Novelty of Proposed Solution",
      score: 0,
      maxScore: 20,
      description: "Assess innovation and uniqueness of approach",
    },
    {
      name: "Methodology",
      score: 0,
      maxScore: 20,
      description: "Evaluate the approach and problem-solving methods",
    },
    {
      name: "Technology Stack",
      score: 0,
      maxScore: 20,
      description: "Rate the chosen technologies and implementation",
    },
  ]);

  // Handle score change
  const handleScoreChange = (criteriaType, index, newScore) => {
    if (criteriaType === "left") {
      const updatedCriteria = [...leftCriteria];
      updatedCriteria[index].score = Math.min(
        Math.max(newScore, 0),
        updatedCriteria[index].maxScore,
      );
      setLeftCriteria(updatedCriteria);
    } else if (criteriaType === "right") {
      const updatedCriteria = [...rightCriteria];
      updatedCriteria[index].score = Math.min(
        Math.max(newScore, 0),
        updatedCriteria[index].maxScore,
      );
      setRightCriteria(updatedCriteria);
    }
  };

  // Calculate total score
  const calculateTotalScore = () => {
    const totalLeftScore = leftCriteria.reduce(
      (acc, criteria) => acc + criteria.score,
      0,
    );
    const totalRightScore = rightCriteria.reduce(
      (acc, criteria) => acc + criteria.score,
      0,
    );
    return totalLeftScore + totalRightScore;
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    const AllScores = [...leftCriteria, ...rightCriteria];
    console.log("Total Score Submitted:", totalScore);
    console.log("ALl Scores:", AllScores);
    // You can send the data to a server or process it further
  };

  return (
    <>
      <Box
        sx={{
          width: "85%",
          mx: "auto",
          mb: 3,
          display: "flex",
          justifyContent: isMobile ? "center" : "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{ width: isMobile ? "25rem" : 550, height: "max-content" }}
        >
          <Box sx={{ width: "100%", textAlign: "left", p: 3 }}>
            <Typography variant="h5" color="#eb272e" sx={{ fontWeight: 500 }}>
              Project Fundamentals
            </Typography>
            <Typography variant="body1" color="#84b4d9">
              Core aspects of project evaluation (Max 40 points)
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              {leftCriteria.map((criteria, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1 }}>
                  <Box sx={{ width: "60%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="h6">{criteria.name}</Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "0.9rem" }}
                      color="textSecondary"
                    >
                      {criteria.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TextField
                      value={criteria.score}
                      onChange={(e) =>
                        handleScoreChange(
                          "left",
                          index,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      variant="outlined"
                      sx={{
                        width: "60px",
                      }}
                    />
                    <Typography variant="h5" color="black">
                      /{criteria.maxScore}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            width: isMobile ? "25rem" : 550,
            height: "max-content",
            minHeight: 390,
            pb: isMobile ? 3 : 0,
          }}
        >
          <Box sx={{ width: "100%", textAlign: "left", p: 3 }}>
            <Typography variant="h5" color="#eb272e" sx={{ fontWeight: 500 }}>
              Innovation & Technical Merit
            </Typography>
            <Typography variant="body1" color="#84b4d9">
              Advanced evaluation criteria (Max 60 points)
            </Typography>
          </Box>
          <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 3 }}>
            {rightCriteria.map((criteria, index) => (
              <Box key={index} sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ width: "70%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ textAlign: "left" }}>
                      {criteria.name}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: isMobile ? "0.8rem" : "0.95rem",
                      textAlign: "left",
                    }}
                    color="textSecondary"
                  >
                    {criteria.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "30%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TextField
                    value={criteria.score}
                    onChange={(e) =>
                      handleScoreChange(
                        "right",
                        index,
                        parseInt(e.target.value) || 0,
                      )
                    }
                    variant="outlined"
                    sx={{
                      width: "60px",
                    }}
                  />
                  <Typography variant="h5" color="black">
                    /{criteria.maxScore}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      <Paper
        sx={{
          width: "83%",
          mx: "auto",
          mb: 3,
          minHeight: 100,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 2 : 0,
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : "70%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 0.6,
          }}
        >
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography sx={{ color: "#71717a" }}>Overall Score</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "space-between" : "flex-start",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "black",
                fontWeight: 600,
                mr: 1,
                fontSize: isMobile ? "2rem" : "3rem",
              }}
            >
              Total Score:{" "}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "black",
                  fontWeight: 600,
                  fontSize: isMobile ? "2rem" : "3rem",
                }}
              >
                {calculateTotalScore()}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: "#71717a",
                  fontWeight: 600,
                  fontSize: isMobile ? "2rem" : "3rem",
                }}
              >
                /100
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "9rem", height: "2.4rem", bgcolor: "#eb272e" }}
            onClick={handleSubmit}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Submit
            </Typography>
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default NewEevaluatorsInput;
