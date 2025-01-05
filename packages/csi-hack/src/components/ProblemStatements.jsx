import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProblemStatement = ({ title, description, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      width: { xs: "90%", sm: 350 },
      padding: 3,
      backgroundColor: "#e41d22",
      borderRadius: 3,
      backdropFilter: "blur(80px) brightness(100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      cursor: "pointer", // Makes the box look clickable
    }}
    onClick={onClick}
  >
    <Typography
      variant="h4"
      component="div"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 500,
        color: "white",
        textAlign: "center",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      component="p"
      sx={{
        fontFamily: "'Bai Jamjuree', Helvetica",
        fontWeight: 400,
        color: "white",
        textAlign: "center",
      }}
    >
      {description}
    </Typography>
  </Paper>
);

const ProblemStatements = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for managing modal
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "" });

  const handleOpen = (title, description) => {
    setModalContent({ title, description });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const problemDetails = [
    {
      title: "Customer Service Improvement",
      description:
        "Build a business analytics based Appointment Management System for efficient customer service.The objective is to design and implement a highly accurate facial recognition system that can authenticate and accept customer service queries via video/audio recordings and create appointments. This solution should integrate with the bank’s mobile application and utilize AADHAAR-based authentication for fraud prevention. The system should include:Analytical Snapshot : The system will generate an analytical snapshot of the customer’s profile based on their existing data with the bank, ensuring personalized and efficient service.New Customer Handling: For new customers, the system will direct them to the correct business unit to ensure their situation is appropriately addressed. The data from Aadhaar and PAN will be used to fetch relevant information to better understand their financial needs and mitigate potential risks.Additionally the solution should include a face training model built into the app to store data and perform edge processing. A feedback module should generate AI-based suggestions for the branch and individual staff, enhancing customer service. The solution must be cost-effective and deployable to rural branches, ensuring accessibility for all customers.",
    },
    {
      title: "Analytical Snapshot",
      description:
        "This is the detailed description for problem statement 2. It provides insights and specifics.",
    },
    {
      title: "New Customer Handling",
      description:
        "This is the detailed description for problem statement 3. It includes background and solutions.",
    },
  ];

  const renderModal = () => (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          position: "relative", // To position the close icon
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#e41d22",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#e41d22" }}>
          {modalContent.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {modalContent.description}
        </Typography>
      </Box>
    </Modal>
  );

  if (isMobile) {
    // Mobile UI
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          gap: 3, // Added gap for spacing between boxes
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: theme.typography.h4.fontFamily,
            fontWeight: "normal",
            color: "#e41d22",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          PROBLEM STATEMENTS
        </Typography>
        {problemDetails.map((problem, index) => (
          <ProblemStatement
            key={index}
            title={problem.title}
            description={problem.description.substring(0, 50) + "..."} // Shortened description
            onClick={() => handleOpen(problem.title, problem.description)}
          />
        ))}
        {renderModal()}
      </Box>
    );
  }

  // Desktop UI
  return (
    <Box
      sx={{
        width: 1309,
        height: 722,
        backgroundImage: "url(/Vector.svg)",
        backgroundSize: "100% 100%",
        position: "relative",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: 22,
          left: 559,
          fontFamily: theme.typography.h1,
          fontWeight: "normal",
          color: "#e41d22",
          fontSize: 64,
        }}
      >
        PROBLEM STATEMENTS
      </Typography>
      <Grid
        container
        spacing={5}
        sx={{
          position: "absolute",
          top: 266,
          left: 12,
          justifyContent: "center",
        }}
      >
        {problemDetails.map((problem, index) => (
          <Grid item key={index}>
            <ProblemStatement
              title={problem.title}
              description={problem.description.substring(0, 50) + "..."} // Shortened description
              onClick={() => handleOpen(problem.title, problem.description)}
            />
          </Grid>
        ))}
      </Grid>
      {renderModal()}
    </Box>
  );
};

export default ProblemStatements;
