import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Component2_redCard1 from "./Component2_redCard1";
import Component3_redcard2 from "./Component3_redcard2";
import Component1_whitecard from "./Component1_whitecard";

function HomePageWrapperForLg(props) {
  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");
  return (
    <Box
      position={"relative"}
      width={"100%"}
      maxWidth={isMid?"1000px":"1577px"}
      height={"100%"}
      marginX={isMid?"auto":null}
      marginTop={"-25px"}
    >
      <Component1_whitecard />
      <Component2_redCard1 />
      <Component3_redcard2 />
    </Box>
  );
}

export default HomePageWrapperForLg;
