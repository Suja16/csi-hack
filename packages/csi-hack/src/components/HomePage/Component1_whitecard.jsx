import { Box, Typography } from "@mui/material";
import React from "react";
import Logo from "../../assets/CroppedfinalLogo.png";
import UnionBankLogo from "../../assets/unionBankLogo.jpeg";

function Component1_whitecard(props) {
  return (
    <Box
      width={"100vw"}
      height={"400px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        width="max-content"
        left={"36%"}
        height="387px"
        position={"absolute"}
      >
        <svg
          width="861"
          height="387"
          viewBox="0 0 861 387"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 35C0 15.67 15.6701 0 35 0H826C845.33 0 861 15.6701 861 35V232.274C861 242.228 856.762 251.711 849.346 258.35L715.614 378.076C709.196 383.823 700.884 387 692.269 387H371.391C352.061 387 336.391 371.33 336.391 352V290C336.391 270.67 320.721 255 301.391 255H35C15.67 255 0 239.33 0 220V35Z"
            fill="white"
          />
        </svg>
        <Box
          width={"max-content"}
          position={"absolute"}
          zIndex={1}
          left={"0"}
          height={"max-content"}
          top={"10%"}
        >
          <img width={"400px"} src={Logo} alt="" />
        </Box>
        <Typography
          variant="p"
          color="#0166B3"
          fontWeight={"Bold"}
          fontSize={"25px"}
          right={0}
          position={"absolute"}
          zIndex={2}
          height={"max-content"}
          marginTop={"10%"}
          textAlign={"center"}
          marginRight={"10%"}
        >
          PRESENTED BY
        </Typography>
        <Box
          top={"30%"}
          // marginLeft={"-60px"}
          position={"absolute"}
          zIndex={1}
          width={"max-content"}
          marginTop={2}
          marginX={"68%"}
          left={"-60px"}
          height={"max-content"}
        >
          <img src={UnionBankLogo} width={"304px"} alt="" />
        </Box>
        <Typography variant="button" position={"absolute"} top={"70%"} right={"25%"} bgcolor="#2846AA" color="white" padding={"6px 20px"} borderRadius="10px" fontSize="28px">Register</Typography>
      </Box>
    </Box>
  );
}

export default Component1_whitecard;
