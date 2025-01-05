import { Box, Button, Typography } from "@mui/material";
import React from "react";
import csiLogo from "../../assets/csi_logo.png";
import finalLogo from "../../assets/finalLogo.png";
import unionBankLogo from "../../assets/unionBankLogo.jpeg";

function HomePageForMobile(props) {
  return (
    <Box display={"flex"} marginTop={"-30px"} height="100vh" justifyContent={"center"}>
      <Box
        width={"98%"}
        height={"100vh"}
        position={"absolute"}
        zIndex={8}
        maxWidth={"400px"}
      >
        <Box
          width={"100%"}
          position={"absolute"}
          display={"flex"}
          justifyContent={"end"}
        >
          <svg
            width="341"
            height="197"
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
          <Box position={"absolute"} top={"-11%"} left={28}>
            <img width="170px" src={finalLogo} alt="" />
          </Box>
          <Box position={"absolute"} top={"28%"} right={10}>
            <Typography color="#0166B3" textAlign={"center"} fontWeight="bold">PRESENTED BY</Typography>
            <img width={"180px"} src={unionBankLogo} alt="" />
          </Box>
          <Typography variant="button" position={"absolute"} top={"65%"} right={70} bgcolor="#2846AA" color="white" padding={"6px 20px"} borderRadius="10px">Register</Typography>
        </Box>
        <Box
          width={"100%"}
          position={"absolute"}
          display={"flex"}
          justifyContent={"start"}
          top={"17%"}
        >
          <svg
            width="313"
            height="211"
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
            position={"absolute"}
            left={95}
            top={20}
            color="white"
            variant="h2"
            textAlign={"center"}
            fontSize={12}
            width={60}
            fontWeight={"bold"}
          >
            Feb 28 2024
          </Typography>
          <Typography
            position={"absolute"}
            top={"46%"}
            left={30}
            width={"188px"}
            color="white"
            fontSize={"23px"}
          >
            INDIA’S LARGEST HACKATHON
          </Typography>
          <Box position={"absolute"} top={"46%"} left="45%">
            <img width="100px" src={csiLogo} alt="" />
          </Box>
        </Box>
        <Box
          width="95%"
          height="180px"
          borderRadius={"30px"}
          bgcolor={"#E41D22"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          top={"45%"}
          left={"2.5%"} marginTop={2}
        >
          <Box
            width={"307px"}
            height={"max-content"}
            textAlign={"center"}
            fontWeight={500}
            fontFamily={"Archigadget"}
            color={"white"}
          >
            <Typography variant="h2" fontSize={30}>
              PRIZE POOL WORTH
            </Typography>
            <Typography
              variant="h1"
              fontWeight={"bold"}
              fontSize={60}
              marginTop={2}
            >
              ₹11L
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePageForMobile;
