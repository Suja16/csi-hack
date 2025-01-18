import { Box } from "@mui/material";
import CarouselHomePage from "../components/Carousel";
import ProblemStatements from "../components/NewProblemStatement";
import Banner from "../components/sponsor_banner";
import Timeline from "../components/NewTimeline";
import Hero from "../components/Hero";
import OrganizerSection from "../components/OrganizerSection"

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
      <OrganizerSection />
    </Box>
  );
}
