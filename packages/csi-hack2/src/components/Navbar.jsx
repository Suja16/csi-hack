import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Logo from "../assets/CroppedfinalLogo.png";

import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [hamMenu, setHamMenu] = useState(false);
  const isMid = useMediaQuery("(max-width:900px) ,(max-width:1462px)");

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          paddingLeft: { xs: "10px", md: "50px" },
        }}
      >
        <Box width={"10%"}>
          <img height="55px" width="110px" src={Logo} alt="Logo" />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={7}
          width={"90%"}
          sx={{
            display: { xs: "none", lg: "flex" },
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            HOME
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="#problems"
            onClick={(e) => handleSmoothScroll(e, "#problems")}
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            PROBLEM STATEMENTS
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="#guidelines"
            onClick={(e) => handleSmoothScroll(e, "#guidelines")}
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            GUIDELINES
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="#faq"
            onClick={(e) => handleSmoothScroll(e, "#faq")}
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            FAQs
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="#prizes"
            onClick={(e) => handleSmoothScroll(e, "#prizes")}
            sx={{ textDecoration: "none" }}
            color="black"
            fontSize={"16px"}
          >
            PRIZES
          </Typography>
          <Typography
            variant="h6"
            component="a"
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
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
            paddingRight: { xs: "30px", md: isMid ? "40px" : "90px" },
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
        top={"65px"}
        borderRadius="15px"
        zIndex={30}
        gap={3.5}
        sx={{
          left: { xs: "9px", md: "5px" },
          display: { xs: "flex", lg: "none" },
          flexDirection: "column",
          padding: "20px",
          paddingLeft: "30px",
          width: { xs: "95.5%", md: isMid ? "99%" : "95%" },
          opacity: hamMenu ? 1 : 0,
          transform: hamMenu ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: hamMenu ? "auto" : "none",
          transition:
            "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
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
          href="#problems"
          onClick={(e) => handleSmoothScroll(e, "#problems")}
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
          href="#guidelines"
          onClick={(e) => handleSmoothScroll(e, "#guidelines")}
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
          href="#faq"
          onClick={(e) => handleSmoothScroll(e, "#faq")}
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
          href="#prizes"
          onClick={(e) => handleSmoothScroll(e, "#prizes")}
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
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "#contact")}
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
