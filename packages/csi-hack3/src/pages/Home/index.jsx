import { Box } from "@mui/material";

import Carousel from "./Sections/Carousel";
import ProblemStatements from "./Sections/ProblemStatement";
import Timeline from "./Sections/Timeline";
import Hero from "./Sections/Hero";
import OrganizerSection from "./Sections/OrganizerSection";

export default function HomePage() {
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <Carousel />
      <Hero />
      <ProblemStatements />
      <Timeline />
      <OrganizerSection />
    </Box>
  );
}
