import { Box, Typography } from "@mui/material";
import React from "react";
import HomePageWrapperForLg from "./HomePageWrapper";
import HomePageForMobile from "./HomePageForMobile";

function HomePage() {
  return (
    <Box top={0} left={0} right={0} bottom={0} position="absolute" height={"100vh"} width={"100vw"} display={"flex"}justifyContent={"center"}>
      <Box sx={({display:{xs:"none", lg:"block"}})} >
      <HomePageWrapperForLg />
      </Box>
      <Box sx={({display:{xs:"block", lg:"none"}})} width={"100vw"} >
      <HomePageForMobile/>
      </Box>
    </Box>
  );
}

export default HomePage;