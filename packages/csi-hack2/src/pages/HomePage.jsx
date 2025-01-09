import { Box } from "@mui/material";
import CarouselHomePage from "../components/Carousel";
import ProblemStatements from "../components/ProblemStatements";
import Banner from "../components/sponsor_banner";
import Timeline from "../components/Timeline";

export default function HomePage() {
  return (
    <Box sx={{
      overflowX:"hidden",
    }}>
      <CarouselHomePage />
      {/* <Banner/> */}
      <ProblemStatements/>
      <Timeline/>
    </Box>
  );
}
