import { Box, Typography } from "@mui/material";
import React from "react";

function Component3_redcard2(props) {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height="201px"
    >
      <Box
        width="492px"
        height="201px"
        borderRadius={"30px"}
        position={"absolute"}
        marginTop={4}
        marginLeft={4}
        left={"56.5%"}
        bgcolor={"#E41D22"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          width={"307px"}
          height={"max-content"}
          textAlign={"center"}
          fontWeight={400}
          letterSpacing={"-0.205"}
          fontFamily={"Archigadget"}
          color={"white"}
        >
          <Typography variant="h3">PRIZE POOL WORTH ₹11L</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Component3_redcard2;
