import { Box } from "@mui/material";
import CarouselHomePage from "../components/Carousel";
import ProblemStatements from "../components/NewProblemStatement";
import Banner from "../components/sponsor_banner";
import Timeline from "../components/Timeline";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <CarouselHomePage />
      <Hero />
      {/* <Banner /> */}
      <ProblemStatements />
      <Timeline />
    </Box>
  );
}
