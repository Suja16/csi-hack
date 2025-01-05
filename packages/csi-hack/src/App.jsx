import { Box, Button } from "@mui/material";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import BottomBar from "./components/bottom_bar";
import Banner from "./components/sponsor_banner";
import FAQSection from "./components/faq";
import EventTimeline from "./components/LgTimeline/LgTimeLine";
import MobileEventTimeline from "./components/MobileTimeLine/mobile_event_timeline";
import SponsorsMobileBanner from "./components/SponsorsMobileBanner";
import UnderGuiDanceOfMobile from "./components/UnderGuiDanceOfMobile";
import About from "./components/About";
import PrizePool from "./components/PrizePool";
import ProblemStatements from "./components/ProblemStatements";
function App() {
  return (
    <Box
      sx={{ overflowX: "hidden", scrollbarWidth: "none" }}
      bgcolor={"#2846AA"}
      position={"absolute"}
      height={"100vh"}
      width={"100vw"}
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      <Navbar />
      <Box
        position={"relative"}
        marginTop={15}
        height={"100vh"}
        maxHeight={"800px"}
      >
        <HomePage />
      </Box>
      <Box marginBottom={5} sx={{ display: { xs: "none", md: "block" } }}>
        <Banner />
      </Box>
      <Box marginBottom={5} sx={{ display: { xs: "block", md: "none" } }}>
        <SponsorsMobileBanner />
        <UnderGuiDanceOfMobile />
      </Box>
      <Box>
        <About />
      </Box>
      <Box width="86%" marginTop={10} marginBottom={10} marginX={"auto"}>
        <PrizePool />
      </Box>
      <Box width="86%" marginX="auto" marginTop={10} marginBottom={10}>
        <ProblemStatements />
      </Box>
      <Box width={"100%"} sx={{ display: { xs: "none", md: "block" } }}>
        <EventTimeline />
      </Box>
      <Box
        width={"100%"}
        paddingLeft={1}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MobileEventTimeline />
      </Box>
      <Box height={"100vh"}>
        <FAQSection />
      </Box>
      <BottomBar />
    </Box>
  );
}

export default App;
