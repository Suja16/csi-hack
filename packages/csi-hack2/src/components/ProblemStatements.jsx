import { Box, Typography, Container } from "@mui/material";
import CustomizedDialogs from "./ProbLemStatementCards";
import useMediaQuery from "@mui/material/useMediaQuery";

import fintech from "../assets/ps/fintech.png";
import cybersecurity from "../assets/ps/cybersecurity.png";
import genai from "../assets/ps/genai.png";

export default function ProblemStatements() {
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <Container id="ps" maxWidth="xl">
      <Typography
        variant={isMobile ? "h3" : "h3"}
        align="left"
        sx={{
          fontWeight: 500,
          mt: { xs: 6, md: 8 },
          mb: { xs: 2, md: 3 },
          color: "text.primary",
        }}
      >
        Problem Statements
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
      >
        <img
          src={fintech}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Box>
          <Typography
            variant="h4"
            align="right"
            color="secondary"
            sx={{ fontWeight: 500 }}
          >
            Customer Service and Identity Certification
          </Typography>
          <Typography variant="h5" align="right" sx={{ fontWeight: 500 }}>
            Business Analytics-Based Appointment Management System for Efficient
            Customer Service
          </Typography>
          <Typography variant="h6" align="right" marginTop="2rem">
            Design and implement a facial recognition system to streamline
            customer service queries.
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
        sx={{
          backgroundColor: "background.main",
        }}
      >
        <img
          src={cybersecurity}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Typography variant="h4" align="left" sx={{ fontWeight: 500 }}>
          Cybersecurity
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        gap="2rem"
        marginX="-1.5rem"
        padding="1rem"
        paddingX="2.5rem"
      >
        <img
          src={genai}
          alt="Fintech"
          width="20%"
          style={{ borderRadius: 60 }}
        />
        <Typography variant="h4" align="left" sx={{ fontWeight: 500 }}>
          GenAI
        </Typography>
      </Box>
    </Container>
  );
}
