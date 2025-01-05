import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/CroppedfinalLogo.png";

const Navbar = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
      position={"fixed"}
      width={"100%"}
      zIndex={10}
      bgcolor="white"
      paddingY={"10px"}
      paddingLeft={6}
      sx={{
        borderBottomRightRadius: "25px",
        borderBottomLeftRadius: "25px",
      }}
    >
      <Box width={"10%"}>
        <img height="55px" width="110px" src={Logo} alt="" />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
        width={"90%"}
      >
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          HOME
        </Typography>
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          PROBLEM STATEMENTS
        </Typography>
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          GUIDELINES
        </Typography>
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          FAQs
        </Typography>
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          PRIZES
        </Typography>
        <Typography variant="h6" fontWeight={"bold"} fontSize={"16px"}>
          CONTACT US
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
