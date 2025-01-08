import { Box } from "@mui/material";
import React from "react";
import HomePageForMobile from "./HomePageForMobile";
import HomePageWrapperForLg from "./HomePageWrapper";

function HomePage() {
  return (
    <Box top={0} left={0} right={0} bottom={0} position="absolute" height={"100vh"} width={"100vw"} display={"flex"}justifyContent={"center"}>
      <Box sx={({display:{xs:"none", md:"block"}})} >
      <HomePageWrapperForLg />
      </Box>
      <Box sx={({display:{xs:"block", md:"none"}})} width={"100vw"} >
      <HomePageForMobile/>
      </Box>
    </Box>
  );
}

export default HomePage;