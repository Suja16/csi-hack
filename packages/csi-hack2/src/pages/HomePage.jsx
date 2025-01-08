import { Box } from "@mui/material";
import CarouselHomePage from "../components/Carousel";
import ProblemStatements from "../components/ProblemStatements";

export default function HomePage() {
  return (
    <Box>
      <CarouselHomePage />
      <ProblemStatements/>
    </Box>
  );
}
