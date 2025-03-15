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
    name: "Originality of solution",
    score: 0,
    maxScore: 20,
    description: "Originality of solution",
  },
];

const technicalCriteria = [
  {
    name: "Completion of solution",
    score: 0,
    maxScore: 20,
    description: "Completion of solution",
  },
  {
    name: "Quality of Code",
    score: 0,
    maxScore: 10,
    description: "Quality of Code",
  },
];

const userExperienceCriteria = [
  {
    name: "Ease of use and interface design",
    score: 0,
    maxScore: 20,
    description: "Ease of use and interface design",
  },
];

const businessPotentialCriteria = [
  {
    name: "Commercialization and Entrepreneurship viability",
    score: 0,
    maxScore: 20,
    description: "Commercialization and Entrepreneurship viability",
  },
  {
    name: "Market Ready",
    score: 0,
    maxScore: 10,
    description: "Market Ready",
  },
];

const scalabilityCriteria = [
  {
    name: "Potential to scale the solution to larger user base or application",
    score: 0,
    maxScore: 20,
    description:
      "Potential to scale the solution to larger user base or application",
  },
  {
    name: "Future Work Progression",
    score: 0,
    maxScore: 10,
    description: "Future Work Progression",
  },
];

const teamPotentialCriteria = [
  {
    name: "Incorporated Suggestion Recommended in Round 1",
    score: 0,
    maxScore: 10,
    description: "Incorporated Suggestion Recommended in Round 1",
  },
  {
    name: "Evaluators Impression",
    score: 0,
    maxScore: 10,
    description: "Overall impression of the evaluator",
  },
];

function Evaluation1({ teamId }) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryColor = "#eb272e";
  const secondaryColor = "#84b4d9";

  const { allTeams, refetch } = useContext(TeamsContext);
  const { userData } = useContext(UserDataContext);
  const id = teamId;
  const disabled = false;

  const [innovation, setInnovation] = useState(innovationCriteria);
  const [technical, setTechnical] = useState(technicalCriteria);
  const [userExperience, setUserExperience] = useState(userExperienceCriteria);
  const [businessPotential, setBusinessPotential] = useState(
    businessPotentialCriteria,
  );
  const [scalability, setScalability] = useState(scalabilityCriteria);
  const [teamPotential, setTeamPotential] = useState(teamPotentialCriteria);

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);

  useEffect(() => {
    if (allTeams[id]?.metric_score) {
      const metricScores = allTeams[id].metric_score;
      setInnovation(metricScores.slice(0, 1));
      setTechnical(metricScores.slice(1, 3));
      setUserExperience(metricScores.slice(3, 4));
      setBusinessPotential(metricScores.slice(4, 6));
      setScalability(metricScores.slice(6, 8));
      setTeamPotential(metricScores.slice(8, 10));
    } else {
      setInnovation(innovationCriteria);
      setTechnical(technicalCriteria);
      setUserExperience(userExperienceCriteria);
      setBusinessPotential(businessPotentialCriteria);
      setScalability(scalabilityCriteria);
      setTeamPotential(teamPotentialCriteria);
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

  const handleScoreChange = (criteriaType, index, newScore) => {
    const updatedValue = Math.min(
      Math.max(newScore, 0),
      getCriteriaByType(criteriaType)[index].maxScore,
    );

    switch (criteriaType) {
      case "innovation":
        setInnovation((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      case "technical":
        setTechnical((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      case "userExperience":
        setUserExperience((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      case "businessPotential":
        setBusinessPotential((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      case "scalability":
        setScalability((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      case "teamPotential":
        setTeamPotential((prev) =>
          prev.map((item, i) =>
            i === index ? { ...item, score: updatedValue } : item,
          ),
        );
        break;
      default:
        break;
    }
  };

  const getCriteriaByType = (type) => {
    switch (type) {
      case "innovation":
        return innovation;
      case "technical":
        return technical;
      case "userExperience":
        return userExperience;
      case "businessPotential":
        return businessPotential;
      case "scalability":
        return scalability;
      case "teamPotential":
        return teamPotential;
      default:
        return [];
    }
  };

  const calculateScores = () => {
    const innovationScore = innovation.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const technicalScore = technical.reduce((acc, item) => acc + item.score, 0);
    const userExperienceScore = userExperience.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const businessPotentialScore = businessPotential.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const scalabilityScore = scalability.reduce(
      (acc, item) => acc + item.score,
      0,
    );
    const teamPotentialScore = teamPotential.reduce(
      (acc, item) => acc + item.score,
      0,
    );

    const totalScore =
      innovationScore +
      technicalScore +
      userExperienceScore +
      businessPotentialScore +
      scalabilityScore +
      teamPotentialScore;

    return {
      innovationScore,
      technicalScore,
      userExperienceScore,
      businessPotentialScore,
      scalabilityScore,
      teamPotentialScore,
      totalScore,
    };
  };

  const handleSubmit = () => {
    setIsOpen(false);
    const { totalScore } = calculateScores();
    const allScores = [
      ...innovation,
      ...technical,
      ...userExperience,
      ...businessPotential,
      ...scalability,
      ...teamPotential,
    ];

    insertScores({
      variables: {
        team_id: id,
        user_Id: userData.id,
        metric_score: allScores,
        totalscore: totalScore,
      },
    });
  };

  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#8bc34a";
    if (percentage >= 40) return "#ffc107";
    if (percentage >= 20) return "#ff9800";
    return "#f44336";
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
    userExperienceScore,
    businessPotentialScore,
    scalabilityScore,
    teamPotentialScore,
    totalScore,
  } = calculateScores();

  const totalPercentage = (totalScore / 150) * 100;
  const scoreColor = getScoreColor(totalScore, 150);

  return (
    <>
      <Box sx={{ width: "95%", maxWidth: "800px", mx: "auto", mb: 4 }}>
        {renderCriteriaSection(
          innovation,
          "Innovation",
          "Originality of solution",
          20,
          "innovation",
          "#e91e63",
        )}

        {renderCriteriaSection(
          technical,
          "Technical Feasibility",
          "Technical implementation quality",
          30,
          "technical",
          "#2196f3",
        )}

        {renderCriteriaSection(
          userExperience,
          "User Experience",
          "Interface and usability",
          20,
          "userExperience",
          "#9c27b0",
        )}

        {renderCriteriaSection(
          businessPotential,
          "Business Potential",
          "Market viability and readiness",
          30,
          "businessPotential",
          "#009688",
        )}

        {renderCriteriaSection(
          scalability,
          "Scalability",
          "Growth potential and future work",
          30,
          "scalability",
          "#ff9800",
        )}

        {renderCriteriaSection(
          teamPotential,
          "Team Potential",
          "Team performance and evaluation",
          20,
          "teamPotential",
          "#ff5722",
        )}

        <Paper elevation={4} sx={{ p: 3, mt: 3, borderRadius: "12px" }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <ScoreChip
              label={`Innovation: ${innovationScore}/20`}
              color="#e91e63"
            />
            <ScoreChip
              label={`Technical: ${technicalScore}/30`}
              color="#2196f3"
            />
            <ScoreChip
              label={`UX: ${userExperienceScore}/20`}
              color="#9c27b0"
            />
            <ScoreChip
              label={`Business: ${businessPotentialScore}/30`}
              color="#009688"
            />
            <ScoreChip
              label={`Scalability: ${scalabilityScore}/30`}
              color="#ff9800"
            />
            <ScoreChip
              label={`Team: ${teamPotentialScore}/20`}
              color="#ff5722"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Total Score</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h4" color={scoreColor}>
                {totalScore}
              </Typography>
              <Typography variant="body1">/150</Typography>
            </Box>
          </Box>

          <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: primaryColor }}
            onClick={() => setIsOpen(true)}
            loading={loading}
          >
            Submit Evaluation
          </LoadingButton>
        </Paper>
      </Box>

      <Popup dialogProps={{ open: isOpen, onClose: () => setIsOpen(false) }}>
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

const ScoreChip = ({ label, color }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "4px 12px",
      borderRadius: "16px",
      bgcolor: alpha(color, 0.1),
      border: `1px solid ${alpha(color, 0.3)}`,
    }}
  >
    <Box
      sx={{ width: 8, height: 8, bgcolor: color, borderRadius: "50%", mr: 1 }}
    />
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {label}
    </Typography>
  </Box>
);

export default Evaluation1;
