import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Divider,
  Fade,
  LinearProgress,
  alpha,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { INSERT_SCORES } from "../queries";
import TeamsContext from "../contexts/teamsContext";
import UserDataContext from "../contexts/userDataContext";
import Popup from "../../../ui/popup";

const innovationCriteria = [
  {
    name: "Problem Definition",
    score: 0,
    maxScore: 10,
    description: "Meeting the requirements of problem definition",
  },
  {
    name: "Solution Clarity",
    score: 0,
    maxScore: 10,
    description: "Clarity of solution",
  },
  {
    name: "Novelty",
    score: 0,
    maxScore: 20,
    description: "Novelty of method and Implementation",
  },
];

const technicalCriteria = [
  {
    name: "Feasibility",
    score: 0,
    maxScore: 20,
    description: "Feasibility of solution",
  },
  {
    name: "Technology Stack",
    score: 0,
    maxScore: 10,
    description: "Technology Stack",
  },
];

const scalabilityCriteria = [
  {
    name: "Sustainability",
    score: 0,
    maxScore: 10,
    description: "Sustainability (Long Term Usable and Scalable)",
  },
  {
    name: "Impact",
    score: 0,
    maxScore: 10,
    description: "Scale of impact (Usability of Solution)",
  },
];

const impressionCriteria = [
  {
    name: "Evaluator's Impression",
    score: 0,
    maxScore: 10,
    description: "Overall impression of the evaluator",
  },
];

function Evalution1({ teamId }) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryColor = "#eb272e";
  const secondaryColor = "#84b4d9";

  const { allTeams, refetch } = useContext(TeamsContext);
  const { userData } = useContext(UserDataContext);
  const id = teamId;
  const [disabled, setDisabled] = useState(false);

  const [innovation, setInnovation] = useState(innovationCriteria);
  const [technical, setTechnical] = useState(technicalCriteria);
  const [scalability, setScalability] = useState(scalabilityCriteria);
  const [impression, setImpression] = useState(impressionCriteria);
  const [remark, setRemark] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);

  useEffect(() => {
    const feedback = allTeams[id]?.feedbacks_from_idea.find(
      (feedback) => feedback.Idea_USER.for == "evaluation1",
    );
    if (feedback) {
      const metricScores = feedback.metric_score;
      setInnovation(metricScores.slice(0, 3));
      setTechnical(metricScores.slice(3, 5));
      setScalability(metricScores.slice(5, 7));
      setImpression(metricScores.slice(7, 8));
      setRemark(feedback.remarks || "");
      setDisabled(true);
    } else {
      setInnovation(innovationCriteria);
      setTechnical(technicalCriteria);
      setScalability(scalabilityCriteria);
      setImpression(impressionCriteria);
      setDisabled(false);
    }
  }, [allTeams, id]);

  const [insertScores, { loading }] = useMutation(INSERT_SCORES, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  // Handle score change
  const handleScoreChange = (criteriaType, index, newScore) => {
    const updatedValue = Math.min(
      Math.max(newScore, 0),
      getCriteriaByType(criteriaType)[index].maxScore,
    );

    if (criteriaType === "innovation") {
      const updated = [...innovation];
      updated[index].score = updatedValue;
      setInnovation(updated);
    } else if (criteriaType === "technical") {
      const updated = [...technical];
      updated[index].score = updatedValue;
      setTechnical(updated);
    } else if (criteriaType === "scalability") {
      const updated = [...scalability];
      updated[index].score = updatedValue;
      setScalability(updated);
    } else if (criteriaType === "impression") {
      const updated = [...impression];
      updated[index].score = updatedValue;
      setImpression(updated);
    }
  };

  const getCriteriaByType = (type) => {
    switch (type) {
      case "innovation":
        return innovation;
      case "technical":
        return technical;
      case "scalability":
        return scalability;
      case "impression":
        return impression;
      default:
        return [];
    }
  };

  // Calculate total score and category scores
  const calculateScores = () => {
    const innovationScore = innovation.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const technicalScore = technical.reduce((acc, item) => acc + item.score, 0);
    const scalabilityScore = scalability.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const impressionScore = impression.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const totalScore =
      innovationScore + technicalScore + scalabilityScore + impressionScore;

    return {
      innovationScore,
      technicalScore,
      scalabilityScore,
      impressionScore,
      totalScore,
    };
  };

  const handleSubmit = () => {
    setIsOpen(false);
    const { totalScore } = calculateScores();
    const allScores = [
      ...innovation,
      ...technical,
      ...scalability,
      ...impression,
    ];

    insertScores({
      variables: {
        team_id: id,
        user_Id: userData.id,
        metric_score: allScores,
        totalscore: totalScore,
        remarks: remark,
      },
    });
  };

  // Get color for score percentage visualization
  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "#4caf50"; // Green
    if (percentage >= 60) return "#8bc34a"; // Light Green
    if (percentage >= 40) return "#ffc107"; // Yellow
    if (percentage >= 20) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  const renderCriteriaSection = (
    criteria,
    title,
    subtitle,
    maxPoints,
    criteriaType,
    color = primaryColor,
    secondaryColorValue = secondaryColor,
  ) => {
    const isHighlighted = highlightedSection === criteriaType;

    // Calculate section total
    const sectionTotal = criteria.reduce((acc, item) => acc + item.score, 0);
    const sectionPercentage = (sectionTotal / maxPoints) * 100;

    return (
      <Paper
        elevation={isHighlighted ? 6 : 3}
        sx={{
          width: "100%",
          maxWidth: "100%",
          height: "max-content",
          mb: 3,
          borderRadius: "12px",
          transition: "all 0.3s ease",
          transform: isHighlighted ? "scale(1.01)" : "scale(1)",
          overflow: "hidden",
          border: isHighlighted ? `1px solid ${color}` : "none",
        }}
        onMouseEnter={() => setHighlightedSection(criteriaType)}
        onMouseLeave={() => setHighlightedSection(null)}
      >
        <Box sx={{ width: "100%", height: "8px", bgcolor: color }}>
          <Box
            sx={{
              height: "100%",
              width: `${sectionPercentage}%`,
              bgcolor: alpha(color, 0.6),
              transition: "width 0.5s ease-out",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            textAlign: "left",
            p: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant={isSmScreen ? "h6" : "h5"}
              color={color}
              sx={{
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: getScoreColor(sectionTotal, maxPoints),
              }}
            >
              {sectionTotal}/{maxPoints}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color={secondaryColorValue}
            fontSize={isSmScreen ? "0.8rem" : "0.9rem"}
            sx={{ mb: 2, opacity: 0.9 }}
          >
            {subtitle}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={sectionPercentage}
            sx={{
              mb: 3,
              height: 6,
              borderRadius: 3,
              bgcolor: alpha(color, 0.1),
              "& .MuiLinearProgress-bar": {
                bgcolor: color,
              },
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            {criteria.map((item, index) => (
              <Fade
                in={true}
                key={index}
                timeout={300 + index * 100}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isSmScreen ? "column" : "row",
                    gap: 1.5,
                    pb: 2,
                    borderBottom:
                      index !== criteria.length - 1 ? "1px solid #eee" : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: isSmScreen ? "100%" : "70%",
                      mb: isSmScreen ? 1 : 0,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant={isSmScreen ? "body1" : "h6"}
                        fontWeight="500"
                        color="text.primary"
                        sx={{ mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        opacity: 0.7,
                        fontStyle: "italic",
                      }}
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: isSmScreen ? "100%" : "30%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isSmScreen ? "flex-start" : "flex-end",
                      gap: 1,
                    }}
                  >
                    <TextField
                      value={item.score}
                      disabled={disabled}
                      onChange={(e) =>
                        handleScoreChange(
                          criteriaType,
                          index,
                          parseInt(e.target.value) || 0,
                        )
                      }
                      variant="outlined"
                      type="number"
                      inputProps={{
                        min: 0,
                        max: item.maxScore,
                        style: {
                          textAlign: "center",
                          fontWeight: "bold",
                        },
                      }}
                      sx={{
                        width: { xs: "70px", sm: "70px" },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "&:hover fieldset": {
                            borderColor: color,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: color,
                            borderWidth: "2px",
                          },
                        },
                      }}
                      size={isSmScreen ? "small" : "medium"}
                    />
                    <Typography
                      variant={isSmScreen ? "body1" : "h6"}
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      /{item.maxScore}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            ))}
          </Box>
        </Box>
      </Paper>
    );
  };

  const {
    innovationScore,
    technicalScore,
    scalabilityScore,
    impressionScore,
    totalScore,
  } = calculateScores();

  // Calculate total percentage
  const totalPercentage = (totalScore / 100) * 100;
  const scoreColor = getScoreColor(totalScore, 100);

  return (
    <>
      <Box
        sx={{
          width: "95%",
          maxWidth: "800px",
          mx: "auto",
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {renderCriteriaSection(
          innovation,
          "Innovation",
          "Innovation evaluation criteria",
          40,
          "innovation",
          "#e91e63", // Pink
          "#f48fb1",
        )}

        {renderCriteriaSection(
          technical,
          "Technical Feasibility",
          "Technical evaluation criteria",
          30,
          "technical",
          "#2196f3", // Blue
          "#90caf9",
        )}

        {renderCriteriaSection(
          scalability,
          "Scalability",
          "Scalability evaluation criteria",
          20,
          "scalability",
          "#ff9800", // Orange
          "#ffcc80",
        )}

        {renderCriteriaSection(
          impression,
          "Evaluator's Impression",
          "Overall impression",
          10,
          "impression",
          "#4caf50", // Green
          "#a5d6a7",
        )}
      </Box>

      <Paper
        elevation={4}
        sx={{
          width: "95%",
          maxWidth: "800px",
          mx: "auto",
          mb: 5,
          p: { xs: 2, sm: 2.5, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isSmScreen ? "column" : "row",
          gap: isSmScreen ? 3 : 3,
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            bgcolor: "#e0e0e0",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: `${totalPercentage}%`,
              bgcolor: scoreColor,
              transition: "width 0.5s ease",
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            pt: 1,
          }}
        >
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography
              sx={{
                color: "#424242",
                fontSize: isSmScreen ? "0.9rem" : "1rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "1px",
                mb: 1,
              }}
            >
              Category Scores
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 1.5, sm: 2, md: 3 },
                mt: 1,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  bgcolor: alpha("#e91e63", 0.1),
                  borderRadius: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    bgcolor: "#e91e63",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Innovation: {innovationScore}/40
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  bgcolor: alpha("#2196f3", 0.1),
                  borderRadius: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    bgcolor: "#2196f3",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Technical: {technicalScore}/30
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  bgcolor: alpha("#ff9800", 0.1),
                  borderRadius: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    bgcolor: "#ff9800",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Scalability: {scalabilityScore}/20
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  bgcolor: alpha("#4caf50", 0.1),
                  borderRadius: "6px",
                }}
              >
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    bgcolor: "#4caf50",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Impression: {impressionScore}/10
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Suggestions:
          </Typography>
          <TextField
          placeholder="Enter your suggestions"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          disabled={disabled}
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              transition: 'height 0.2s ease',
            }
          }}
        />

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography
              variant={isSmScreen ? "h6" : "h5"}
              sx={{
                color: "#212121",
                fontWeight: 600,
              }}
            >
              Total Score
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1,
                px: 2,
                bgcolor: alpha(scoreColor, 0.1),
                borderRadius: "8px",
                border: `1px solid ${alpha(scoreColor, 0.3)}`,
              }}
            >
              <Typography
                variant={isSmScreen ? "h5" : "h4"}
                sx={{
                  color: scoreColor,
                  fontWeight: 700,
                }}
              >
                {totalScore}
              </Typography>
              <Typography
                variant={isSmScreen ? "body1" : "h6"}
                sx={{
                  color: "#757575",
                  fontWeight: 500,
                }}
              >
                /100
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: isSmScreen ? "100%" : "auto",
            display: "flex",
            justifyContent: isSmScreen ? "center" : "flex-end",
            mt: isSmScreen ? 2 : 0,
          }}
        >
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth={isSmScreen}
            sx={{
              width: isSmScreen ? "100%" : "8rem",
              height: "3rem",
              bgcolor: !disabled ? primaryColor : "#9e9e9e",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              maxWidth: isSmScreen ? "300px" : "auto",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: !disabled ? "#d81b60" : "#9e9e9e",
                transform: !disabled ? "translateY(-2px)" : "none",
                boxShadow: !disabled
                  ? "0 6px 16px rgba(0,0,0,0.15)"
                  : "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
            onClick={() => setIsOpen(true)}
            loading={loading}
            disabled={disabled}
            loadingIndicator={
              <LinearProgress color="inherit" sx={{ width: "100%" }} />
            }
          >
            <Typography
              variant="button"
              sx={{
                color: "white",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              Submit
            </Typography>
          </LoadingButton>
        </Box>
      </Paper>

      <Popup
        dialogProps={{
          open: isOpen,
          onClose: () => setIsOpen(false),
          maxWidth: "sm",
          fullWidth: true,
          sx: {
            "& .MuiDialog-paper": {
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            p: { xs: 2.5, sm: 3 },
          }}
        >
          <Typography
            variant={isSmScreen ? "h6" : "h5"}
            color="secondary"
            textAlign="center"
            fontWeight="600"
          >
            Are you sure you want to submit?
          </Typography>

          <Box
            sx={{
              bgcolor: alpha("#f44336", 0.1),
              p: 2,
              borderRadius: "8px",
              borderLeft: "4px solid #f44336",
            }}
          >
            <Typography
              variant="body2"
              textAlign="center"
              color="#d32f2f"
              fontWeight="500"
            >
              You cannot change the evaluation once submitted
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: isXsScreen ? "column" : "row",
              width: "100%",
              mt: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              fullWidth={isXsScreen}
              sx={{
                width: isXsScreen ? "100%" : "9rem",
                height: "3rem",
                maxWidth: isXsScreen ? "220px" : "auto",
                borderRadius: "8px",
                bgcolor: primaryColor,
                "&:hover": {
                  bgcolor: "#d81b60",
                },
              }}
              onClick={handleSubmit}
            >
              <Typography variant="button" fontWeight="600">
                Yes, Submit
              </Typography>
            </Button>
            <Button
              variant="outlined"
              fullWidth={isXsScreen}
              sx={{
                width: isXsScreen ? "100%" : "9rem",
                height: "3rem",
                maxWidth: isXsScreen ? "220px" : "auto",
                borderRadius: "8px",
                borderColor: "#9e9e9e",
                color: "#616161",
                "&:hover": {
                  borderColor: "#616161",
                  bgcolor: alpha("#9e9e9e", 0.05),
                },
              }}
              onClick={() => setIsOpen(false)}
            >
              <Typography variant="button" fontWeight="500">
                Cancel
              </Typography>
            </Button>
          </Box>
        </Box>
      </Popup>
    </>
  );
}

export default Evalution1;
