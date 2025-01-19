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
    <Container
      maxWidth="xl"
      sx={{
        py: 6,
      }}
      id="ps"
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: 900,
          color: "primary.main",
          marginBottom: (theme) => theme.spacing(6),
          textTransform: "uppercase",
          position: "relative",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-15px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            backgroundColor: "secondary.main",
            borderRadius: "2px",
          },
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
                  variant="h4"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    mb: 2,
                  }}
                >
                  {ps.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {ps.objective}
                </Typography>
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
              <Typography variant="h6" component="div">
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
                <Typography variant="h3">Objective:</Typography>
                <Typography>{selectedPS.objective}</Typography>
                <Typography variant="h3">Core Components:</Typography>
                <ul>
                  {selectedPS.coreComponents.map((component, index) => (
                    <li key={index}>
                      <Typography>{component}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="h3">Real-Life Use Cases:</Typography>
                {selectedPS.realLifeUseCases.map((useCase, index) => (
                  <div key={index}>
                    <Typography variant="body1">{useCase.scenario}</Typography>
                    <ul>
                      {useCase.description.map((desc, idx) => (
                        <li key={idx}>
                          <Typography>{desc}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Typography variant="h3">Expected Solution:</Typography>
                <ul>
                  {selectedPS.expectedSolution.map((solution, index) => (
                    <li key={index}>
                      <Typography>{solution}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ProblemStatementCard;
