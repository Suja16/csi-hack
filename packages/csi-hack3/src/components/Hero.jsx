import { Container, Typography } from "@mui/material";
import iDEA from "../assets/logos/ideaCropped.png";

const Hero = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        color="primary"
        marginTop="2rem"
      >
        IDEA HACKATHON
      </Typography>
      <Typography
        variant="h4"
        textAlign="center"
        marginTop="1rem"
        color="secondary"
        sx={{ letterSpacing: "0.5rem", fontWeight: 500 }}
      >
        Innovation
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        marginTop="1rem"
        maxWidth="60vw"
      >
        Welcome to iDEA, the Union Bank of India Hackathon, a groundbreaking
        initiative of the Union Bank of India in collaboration with KJ Somaiya
        School of Engineering (KJSSE), Somaiya Vidyavihar University (SVU) and
        under the guidance of the Indian Banks&apos; Association (IBA), and the
        Department of Financial Services (DFS). This hackathon represents a
        concerted effort under the Ministry of Finance&apos;s vision to foster
        innovation and excellence in the realms of financial technology
        (fintech) and cybersecurity.
      </Typography>
      {/* <img src={iDEA} alt="iDEA Hackathon" style={{ width: "40%", margin: "auto" }} /> */}
    </Container>
  );
};

export default Hero;
