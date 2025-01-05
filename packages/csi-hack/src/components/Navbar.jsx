import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/CroppedfinalLogo.png";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [hamMenu, setHamMenu] = useState(false);
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        position={"fixed"}
        width={"100%"}
        zIndex={30}
        bgcolor="white"
        paddingY={"10px"}
        sx={{
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
          paddingLeft: { xs: "10px", md: "50px" },
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
          sx={{
            display: { xs: "none", lg: "flex" },
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            HOME
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            PROBLEM STATEMENTS
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            GUIDELINES
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            FAQs
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            PRIZES
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            CONTACT US
          </Typography>
        </Box>
        <Box
          onClick={() => setHamMenu(!hamMenu)}
          sx={{
            paddingRight: { xs: "30px", md: "90px" },
            display: { xs: "block", lg: "none" },
          }}
        >
          <MenuIcon />
        </Box>
      </Box>
      <Box
        height="400px"
        bgcolor="white"
        position={"fixed"}
        top={"85px"}
        borderRadius="15px"
        zIndex={30}
        gap={3.5}
        sx={{
          left: {xs:"9px", md:"5px"},
          display: { xs: "flex", lg: "none" }, // Always display as flex on mobile but control visibility using opacity and transform
          flexDirection: "column",
          padding: "20px",
          paddingLeft: "30px",
          width:{xs:"95.5%" , md: "95%"}, 
          opacity: hamMenu ? 1 : 0, // Fade in/out
          transform: hamMenu ? "translateY(0)" : "translateY(-20px)", // Slide in/out
          pointerEvents: hamMenu ? "auto" : "none", // Disable interaction when hidden
          transition:
            "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)", // Apply transition to opacity and transform
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          HOME
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          PROBLEM STATEMENTS
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          GUIDELINES
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          FAQs
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          PRIZES
        </Typography>
        <Typography
          variant="h6"
          component="a"
          href="/"
          sx={{ textDecoration: "none" }}
          color="black"
          fontWeight={"semi-bold"}
          fontSize={"24px"}
        >
          CONTACT US
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
