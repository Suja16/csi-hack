import { Box, Typography } from "@mui/material";
import React from "react";
import Component2_redCard1 from "./Component2_redCard1";
import Component3_redcard2 from "./Component3_redcard2";
import Component1_whitecard from "./Component1_whitecard";

function HomePageWrapperForLg(props) {
  return (
    <Box
      position={"relative"}
      width={"100%"}
      maxWidth={"1577px"}
      height={"100%"}
      marginTop={"-25px"}
    >
      <Component1_whitecard />
      <Component2_redCard1 />
      <Component3_redcard2 />
    </Box>
  );
}

export default HomePageWrapperForLg;
