import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Container,
  Box,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import problemStatementsData from "./ProblemStatementsData";
import { useTheme } from "@mui/material/styles";

const cardVariants = {
  offscreen: {
    y: 150,
    opacity: 0,
    scale: 0.95,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.9,
    },
  },
};

const ProblemStatementCard = () => {
  const [selectedPS, setSelectedPS] = useState(null);
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h2"
        sx={{
          mb: 6,
          color: theme.palette.primary.main,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Problem Statements
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {problemStatementsData.map((ps) => (
          <Paper
            key={ps.id}
            elevation={0}
            sx={{
              overflow: "visible",
              borderRadius: 2,
              bgcolor: "transparent",
              py: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                alignItems: { xs: "center", md: "flex-start" },
                position: "relative",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {/* Image Section with Animation */}
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{
                  once: false,
                  amount: 0.5, //  needs more of element in view
                  margin: "-100px 0px", // margin to viewport detection
                }}
                style={{
                  width: "100%", // Full width in mobile view
                  maxWidth: "400px", // Max width for desktop view
                  position: "relative",
                  marginRight: { xs: "0", md: "20px" },
                  marginBottom: { xs: "20px", md: "0" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 160,
                    left: 0,
                    width: "100%",
                    height: "300px",
                    backgroundColor: `${theme.palette.primary.main}15`,
                    borderRadius: "20px",
                    transform: "skew(0deg, -2deg)",
                    zIndex: 0,
                    overflow: "hidden", // background stays within bounds
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "20px",
                      boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
                    },
                  }}
                />

                <motion.div
                  variants={cardVariants}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%", // Full width in mobile view
                    maxWidth: "380px", // Max width for desktop view
                    margin: "0 auto",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "380px",
                      overflow: "hidden",
                      borderRadius: "4rem",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <img
                      src={ps.image}
                      alt={ps.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "18px",
                      }}
                    />
                  </Box>
                </motion.div>
              </motion.div>

              <Box
                sx={{
                  flex: 1,
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s",
                  transform: "translateX(0)",
                  opacity: 0.9,
                  "@media (min-width: 768px)": {
                    "&:hover": {
                      transform: "translateX(-10px)",
                      opacity: 1,
                    },
                  },
                }}
              >
                <Chip
                  label={ps.category}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {ps.title}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  {ps.domain}
                </Typography>
                <Typography
                  sx={{
                    mb: 3,
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {ps.shortDesc}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  {ps.keyPoints.map((point, index) => (
                    <Chip
                      key={index}
                      label={point}
                      sx={{
                        bgcolor: "rgba(0, 87, 156, 0.1)",
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </Box>
                <Box
                  onClick={() => setSelectedPS(ps)}
                  sx={{
                    mt: 2,
                    cursor: "pointer",
                    display: "inline-block",
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  View Details
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Dialog
        open={Boolean(selectedPS)}
        onClose={() => setSelectedPS(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: "#fafafa",
          },
        }}
      >
        {selectedPS && (
          <>
            <DialogTitle
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="div">
                {selectedPS.title}
              </Typography>
              <IconButton
                onClick={() => setSelectedPS(null)}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Box
                sx={{
                  "& .MuiTypography-root": { mb: 2 },
                  "& .MuiTypography-h2": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: "2rem",
                    mb: 3,
                  },
                  "& .MuiTypography-h3": {
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    mb: 2,
                  },
                  "& ul": {
                    paddingLeft: 3,
                    mb: 3,
                  },
                  "& li": {
                    mb: 1,
                  },
                }}
              >
                {selectedPS.id === 1 && (
                  <>
                    <Typography
                      variant="h3"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Objective:
                    </Typography>
                    <Typography>{selectedPS.content.objective}</Typography>
                    <div style={{ width: "100%" }}>
                      <Typography
                        variant="h3"
                        style={{ color: theme.palette.primary.main }}
                      >
                        Core Components of the Solution:
                      </Typography>
                      <ul>
                        {selectedPS.content.coreComponents.map(
                          (component, index) => (
                            <li key={index}>
                              <Typography variant="h4">{component}</Typography>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <Typography
                      variant="h3"
                      style={{
                        color: theme.palette.primary.main,
                        marginTop: "2rem",
                      }}
                    >
                      Real-Life Use Case: Vatsalya’s Interaction with the System
                    </Typography>
                    <div style={{ width: "100%" }}>
                      <Typography>
                        <strong>
                          Scenario 1: Existing Customer (Vatsalya)
                        </strong>
                      </Typography>
                      <ul>
                        {selectedPS.content.realLifeUseCase.existingCustomer.map(
                          (scenario, index) => (
                            <li key={index}>
                              <Typography variant="h4">{scenario}</Typography>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div style={{ width: "100%" }}>
                      <Typography>
                        <strong>Scenario 2: New Customer</strong>
                      </Typography>
                      <ul>
                        {selectedPS.content.realLifeUseCase.newCustomer.map(
                          (scenario, index) => (
                            <li key={index}>
                              <Typography variant="h4">{scenario}</Typography>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <Typography
                      variant="h2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Expected Solution:
                    </Typography>
                    <ul>
                      {selectedPS.content.expectedSolution.map(
                        (solution, index) => (
                          <li key={index}>
                            <Typography variant="h4">{solution}</Typography>
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                )}
                {selectedPS.id === 2 && (
                  <>
                    <Typography>
                      {selectedPS.content.description.join(" ")}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Example Scenario: Arnav’s Challenge
                    </Typography>
                    <Typography>
                      {selectedPS.content.exampleScenario}
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Expected Solution:
                    </Typography>
                    {selectedPS.content.expectedSolution.map(
                      (solution, index) => (
                        <div key={index}>
                          <Typography variant="h3">{solution.title}</Typography>
                          <ul>
                            {solution.points.map((point, idx) => (
                              <li key={idx}>
                                <Typography>{point}</Typography>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </>
                )}
                {selectedPS.id === 3 && (
                  <>
                    <Typography>{selectedPS.content.description}</Typography>
                    <div style={{ width: "100%" }}>
                      <div style={{ paddingLeft: "3px" }}>
                        <Typography
                          variant="h2"
                          style={{
                            color: theme.palette.primary.main,
                            letterSpacing: "3px",
                          }}
                        >
                          Financial Institutions Struggle With:
                        </Typography>
                      </div>
                      <ul>
                        {selectedPS.content.financialInstitutionsStruggleWith.map(
                          (struggle, index) => (
                            <li key={index}>
                              <Typography variant="h3">{struggle}</Typography>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <Typography
                      variant="h2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Real-Life Example: Naman’s Journey
                    </Typography>
                    <Typography>
                      <strong>
                        Scenario 1: Fraudulent Activity Detection:
                      </strong>{" "}
                      {
                        selectedPS.content.realLifeExample
                          .fraudulentActivityDetection
                      }
                    </Typography>
                    <Typography>
                      <strong>Scenario 2: Personalized Services:</strong>{" "}
                      {selectedPS.content.realLifeExample.personalizedServices}
                    </Typography>
                    <Typography>
                      <strong>Scenario 3: Insider Threat Prevention:</strong>{" "}
                      {
                        selectedPS.content.realLifeExample
                          .insiderThreatPrevention
                      }
                    </Typography>
                    <Typography
                      variant="h2"
                      style={{ color: theme.palette.primary.main }}
                    >
                      Expected Solution:
                    </Typography>
                    {selectedPS.content.expectedSolution.map(
                      (solution, index) => (
                        <div key={index}>
                          <Typography variant="h3">{solution.title}</Typography>
                          <ul>
                            {solution.points.map((point, idx) => (
                              <li key={idx}>
                                <Typography>{point}</Typography>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </>
                )}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ProblemStatementCard;
