import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Logo from "../../assets/CroppedfinalLogo.png";
import UnionBankLogo from "../../assets/unionBankLogo.jpeg";

function Component1_whitecard(props) {
  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");
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
        left={isMid ? "11rem" : "35rem"}
        height="387px"
        position={"absolute"}
      >
        <svg
          width={isMid ? "730" : "861"}
          height={isMid ? "300" : "387"}
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
          left={isMid ? "4rem" : "0.6rem"}
          height={"max-content"}
          top={"1.3rem"}
        >
          <img width={isMid ? "250" : "400px"} src={Logo} alt="" />
        </Box>
        <Typography
          variant="p"
          color="#0166B3"
          fontWeight={"Bold"}
          right={0}
          position={"absolute"}
          zIndex={2}
          height={"max-content"}
          marginTop={"10%"}
          textAlign={"center"}
          marginRight={"10rem"}
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
          marginX={isMid ? "28rem" : "34rem"}
          left={"-60px"}
          height={"max-content"}
        >
          <img src={UnionBankLogo} width={isMid ? "260px" : "304px"} alt="" />
        </Box>
        <Typography
          variant={isMid ? "subtitle1" : "h4"}
          component="button"
          position={"absolute"}
          top={isMid ? "13rem" : "17rem"}
          right={isMid ? "11.5rem" : "13rem"}
          bgcolor="#2846AA"
          color="white"
          padding={isMid ? "8px 17px" : "6px 20px"}
          borderRadius="10px"
        >
          Register
        </Typography>
      </Box>
    </Box>
  );
}

export default Component1_whitecard;
