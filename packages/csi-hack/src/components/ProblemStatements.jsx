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
      title: "Problem statement 1",
      description:
        "Customer Service Improvement:\n\nBuild a business analytics based Appointment Management System for efficient customer service                                                             The objective is to design and implement a highly accurate facial recognition system that can authenticate and accept customer service queries via video/audio recordings and create appointments. This solution should integrate with the bank’s mobile application and utilize AADHAAR-based authentication for fraud prevention. The system should include:\n\nAnalytical Snapshot: The system will generate an analytical snapshot of the customer’s profile based on their existing data with the bank, ensuring personalized and efficient service.\n\nNew Customer Handling: For new customers, the system will direct them to the correct business unit to ensure their situation is appropriately addressed. The data from Aadhaar and PAN will be used to fetch relevant information to better understand their financial needs and mitigate potential risks.\n\nAdditionally, the solution should include a face training model built into the app to store data and perform edge processing. A feedback module should generate AI-based suggestions for the branch and individual staff, enhancing customer service. The solution must be cost-effective and deployable to rural branches, ensuring accessibility for all customers.",
    },
    {
      title: "Problem statement 2",
      description:
        "Need for Government Agencies Assistance for takedown of Malicious/Phishing domain\n\nMany times, it is observed that not all domain registrars or hosting providers are cooperative when it comes to requests for phishing domain takedowns, especially if they operate in jurisdictions where state actors/threat actors are not strictly regulated or where cyber security laws are relaxed. We, as a Public Sector Bank (PSB) in India, would like to highlight a significant real-life challenge we face in the timely takedown of suspicious, malicious, or phishing domains impersonating PSB entities. In several instances, our third-party takedown service providers have been unable to successfully remove such phishing domains or fraudulent applications.\n\n\nFurthermore, there is an absence of a well-defined, centralized mechanism provided by the Government of India to address these issues. Specifically, we encounter difficulties in identifying a single point of contact or department within the government responsible for handling such cases, as well as a lack of clear guidelines on how to proceed with these requests. This often leads to delays in resolving these threats, potentially compromising the security of our customers.\n\n\nWe suggest that a dedicated and clearly outlined framework, along with a designated government authority or contact point, be established to streamline the process for takedown requests related to phishing or malicious domains. This would enable PSBs and other financial institutions to effectively respond to such threats in a timely and coordinated manner.",
    },
    {
      title: "Problem statement 3",
      description:
        "Bank accounts are being used as Money Mules for purpose of Money laundering and Financial perpetrating Crimes.\n\n\nBank accounts are being used as Money Mules for purpose laundering perpetrating Crimes. of Money and Financial\n\n\nApplication of Al: How Al can be put to use to address the following challenges being faced by banking industry at present to control this menace and provide solution which work in reall time\n\n\n1. Customer profilling and Onboarding\n\n2. Complex Transaction Network\n\n3. Cross-Bordier Transactions\n\n4. Short Lifespan of Accounts\n\n5. High Falise Positives\n\n6. Advanced Evasion Techniques",
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
          width: 800,
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
        <Typography variant="body1" sx={{ mb: 3, whiteSpace: "pre-wrap" }}>
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
          borderRadius:8,
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
        height: 702,
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
          fontWeight: "bold",
          color: "#e41d22",
          fontSize: 54,
          marginTop: 1,
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
