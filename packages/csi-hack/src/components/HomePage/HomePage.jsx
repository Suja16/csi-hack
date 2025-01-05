import { Box, Typography } from "@mui/material";
import React from "react";
import Compoent1_whiteCard from "./HomePageWrapper";

function HomePage() {
  return (
    <Box top={0} left={0} right={0} bottom={0} position="absolute" height={"100vh"} width={"100vw"} display={"flex"}justifyContent={"center"}>
      <Compoent1_whiteCard />
    </Box>
  );
}

export default HomePage;