import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";

function Component3_redcard2(props) {
  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="201px"
    >
      <Box
        width={isMid?"792px":"492px"}
        height="201px"
        borderRadius={"30px"}
        position={"absolute"}
        marginTop={isMid?"35rem":"2rem"}
        marginLeft={4}
        left={isMid?"3.6rem":"54rem"}
        bgcolor={"#E41D22"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          width={isMid?"90%":"307px"}
          height={"max-content"}
          textAlign={"center"}
          fontWeight={400}
          letterSpacing={"-0.205"}
          fontFamily={"Archigadget"}
          color={"white"}
        >
          <Typography variant={isMid?"h2":"h3"}>PRIZE POOL WORTH <Typography fontWeight={"bold"} variant={isMid?"h2":"h3"}>₹11L</Typography> </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Component3_redcard2;
