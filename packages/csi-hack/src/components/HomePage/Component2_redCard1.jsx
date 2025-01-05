import { Box, Typography } from "@mui/material";
import React from "react";
import csiLogo from "../../assets/csi_logo.png";

function Component2_redCard1(props) {
  return (
    <Box
      top={"6%"}
      // right={"12%"}
      left={"-10%"}
      marginTop={5}
      position={"absolute"}
      width={"100%"}
      height={"541px"}
      display={"flex"}
      justifyContent={"start"}
      alignItems={"center"}
      zIndex={1}
    >
      <Box width="861px" left={"10%"} marginX={"7%"} position={"absolute"}>
        <svg
          width="753"
          height="541"
          viewBox="0 0 753 541"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M50 541C22.3858 541 0 518.614 0 491V265.097C0 251.682 5.39081 238.829 14.9609 229.428L233.923 14.3313C243.273 5.14637 255.855 0 268.962 0H356.948C384.562 0 406.948 22.3858 406.948 50V205.16C406.948 220.014 418.989 232.054 433.842 232.054H460.71C460.724 232.054 460.736 232.043 460.736 232.028C460.736 232.014 460.748 232.002 460.762 232.002H703.001C730.615 232.002 753.001 254.388 753.001 282.002V491C753.001 518.614 730.615 541 703.001 541L566.844 541L460.736 541L50 541Z"
            fill="#E41D22"
          />
        </svg>
        <Typography
          variant="p"
          fontSize={"36px"}
          letterSpacing={"-0.205px"}
          color="white"
          align="right"
          marginRight={"18px"}
          left={200}
          width={"165px"}
          marginTop={"32px"}
          position={"absolute"}
          top={"0"}
          zIndex={3}
        >
          Feb 28 2024
        </Typography>
        <Typography
          variant="p"
          fontWeight={400}
          fontSize={"64px"}
          letterSpacing={"-0.205px"}
          fontFamily={"Archigadget"}
          color="white"
          left={"9%"}
          position={"absolute"}
          top={"45%"}
          zIndex={3}
          width={"500px"}
        >
          INDIA’S LARGEST HACKATHON
        </Typography>
        <Box position={"absolute"} top={"50%"} right={"17%"}>
          <img src={csiLogo} alt="" />
        </Box>
      </Box>
    </Box>
  );
}

export default Component2_redCard1;
