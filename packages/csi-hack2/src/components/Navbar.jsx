import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/CroppedfinalLogo.png";
import { Button } from "@mui/material";
import RegistrationForm from "./registrationFrom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMid = useMediaQuery("(max-width:900px), (max-width:1462px)");
  const [open, setopen] = useState(false);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "PROBLEM STATEMENTS", href: "#problems" },
    { label: "GUIDELINES", href: "#guidelines" },
    { label: "FAQs", href: "#faq" },
    { label: "PRIZES", href: "#prizes" },
    { label: "CONTACT US", href: "#contact" },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  console.log(open);
  return (
    <Box>
      {/* Main Navbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        width="100%"
        zIndex={30}
        bgcolor="white"
        paddingY={2}
        sx={{
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
          padding: 2,
        }}
      >
        <img height="50vw" width="100vw" src={Logo} alt="Logo" />
        {!isMid && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={7}
              width="90%"
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              {navItems.map((item) => (
                <Typography
                  key={item.href}
                  variant="h6"
                  component="a"
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>

            <Button variant="contained" onClick={() => setopen(true)}>
              Register Now
            </Button>
          </>
        )}
        {open && (
          <RegistrationForm open={open} onClose={() => setopen(false)} />
        )}
        {/* Menu Button */}
        {isMid && (
          <Box onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </Box>
        )}
      </Box>

      {/* Mobile Menu */}
      <Box
        height="400px"
        bgcolor="white"
        position="fixed"
        top="65px"
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
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition:
            "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {navItems.map((item) => (
          <Typography
            key={item.href}
            variant="h6"
            component="a"
            href={item.href}
            onClick={(e) => handleSmoothScroll(e, item.href)}
            sx={{
              textDecoration: "none",
              color: "black",
              fontSize: "24px",
              fontWeight: "semi-bold",
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
