import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/idea.png";
import { Button } from "@mui/material";
import RegistrationForm from "./registrationFrom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMid = useMediaQuery("(max-width:1146px)");
  const [open, setopen] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS }
      );
      console.log(response);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", response.data.user);
      const participantResponse = await axios.post(
        `https://api.csi-kjsce.org/api/v1/event/p/get/47`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (participantResponse.data.event.Participant) {
        // navigate("/header");
      }
      const user = response.data.user;
      setUserData({
        degree: user.degree,
        college: user.college,
        branch: user.branch,
        year: user.year,
        gender: user.gender,
        phone_number: user.phone_number,
      });
      setopen(true);
    },
    flow: "auth-code",
  });

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "PROBLEM STATEMENTS", href: "#problems" },
    { label: "GUIDELINES", href: "/guidelines" },
    { label: "FAQs", href: "/faq" },
    { label: "PRIZES", href: "#prizes" },
    { label: "CONTACT US", href: "#contact" },
  ];

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === "/" || targetId === "/guidelines" || targetId === "/faq") {
      navigate(targetId);
    } else {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

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
        <img
          height="40vw"
          width="140vw"
          src={Logo}
          alt="Logo"
          style={{ scale: "1.5", paddingLeft: "1rem" }}
        />
        {!isMid && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={7}
              width="90%"
            >
              {navItems.map((item) => (
                <Typography
                  key={item.href}
                  variant="h6"
                  component={Link}
                  to={item.href}
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

            <Button variant="contained" onClick={() => login()}>
              Register Now
            </Button>
          </>
        )}
        {open && (
          <RegistrationForm
            open={open}
            onClose={() => setopen(false)}
            userData={userData}
          />
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
            component={Link}
            to={item.href}
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
