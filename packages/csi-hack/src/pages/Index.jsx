import { Box, useMediaQuery } from "@mui/material";
import About from "../components/About";
import BottomBar from "../components/bottom_bar";
import FAQSection from "../components/faq";
import HackathonGuidelines from "../components/guidelines";
import EventTimeline from "../components/LgTimeline/LgTimeLine";
import MobileEventTimeline from "../components/MobileTimeLine/mobile_event_timeline";
import Navbar from "../components/Navbar";
import PrizePool from "../components/PrizePool";
import ProblemStatements from "../components/ProblemStatements";
import Banner from "../components/sponsor_banner";
import SponsorsMobileBanner from "../components/SponsorsMobileBanner";
import UnderGuiDanceOfMobile from "../components/UnderGuiDanceOfMobile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import HomePage from "./HomePage";

function Index() {
  const navigate = useNavigate();
  // const status = localStorage.getItem("status");
  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");
    const getData = async () => {
      const response = await axios.post(
        `https://api.csi-kjsce.org/api/v1/event/p/get/47`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // setTeamData(response.data.event.Participant.team);
      console.log(response.data);
      if (response.data.event.Participant) {
        navigate("/header")
      }
    }
    getData();
  }, [navigate]);

  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");
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
      scrollbarWidth
    >
      <Navbar />
      <Box
        position={"relative"}
        marginTop={{ xs: 12, md: 15 }}
        height={{ xs: "40vh", md: "100vh" }}
        maxHeight={"800px"}
        marginBottom={isMid ? "5.5rem" : null}
        id="home"
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
      <Box
        width="86%"
        marginTop={10}
        marginBottom={20}
        marginX={"auto"}
        id="prizes"
      >
        <PrizePool />
      </Box>
      <Box
        width="86%"
        marginX="auto"
        marginTop={10}
        marginBottom={10}
        id="problems"
      >
        <ProblemStatements />
      </Box>
      <Box id="guidelines">
        <HackathonGuidelines />
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
      <Box height={"100vh"} id="faq">
        <FAQSection />
      </Box>
      <Box id="contact">
        <BottomBar id="contact" />
      </Box>
    </Box>
  );
}

export default Index;
