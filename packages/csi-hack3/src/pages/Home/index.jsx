import { Box } from "@mui/material";

import Carousel from "./Sections/Carousel";
import ProblemStatements from "./Sections/ProblemStatement";
import Timeline from "./Sections/Timeline";
import Hero from "./Sections/Hero";
import OrganizerSection from "./Sections/OrganizerSection";
import DatePopup from "../../components/DatePopup";

export default function HomePage() {
  return (
    <Box
      sx={{
        overflowX: "hidden",
      }}
    >
      <DatePopup />
      <Carousel />
      <Hero />
      <ProblemStatements />
      <Timeline />
      <OrganizerSection />
    </Box>
  );
}
