import {
  Container,
  Typography,
} from "@mui/material";
import iDEA from "../assets/logos/ideaCropped.png";

const Hero = () => {
  return (
    <Container>
      <Typography variant="h1" textAlign="center" color="primary" marginTop="2rem">iDEA HACKATHON</Typography>
      <Typography variant="h4" textAlign="center" marginTop="0.5rem">Innovation</Typography>
      {/* <img src={iDEA} alt="iDEA Hackathon" style={{ width: "40%", margin: "auto" }} /> */}
    </Container>
  )
};

export default Hero;
