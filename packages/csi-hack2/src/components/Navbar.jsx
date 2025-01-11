import { useState, useContext, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/idea.png";
import { Button } from "@mui/material";
import RegistrationForm from "./registrationFrom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import UserDataContext from "../contexts/userDataContext";

const Navbar = ({ login, open, setopen, isLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');  // Track active item
  const isMid = useMediaQuery("(max-width:1146px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData, eventData } = useContext(UserDataContext);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItem('/');
    } else {
      setActiveItem(location.pathname);
    }
  }, [location.pathname]);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "PROBLEM STATEMENTS", href: "#ps" },
    { label: "GUIDELINES", href: "/guidelines" },
    { label: "FAQs", href: "/faq" },
    { label: "CONTACT US", href: "#contact" },
    ...(eventData && eventData.Participant
      ? [{ label: "TEAM", href: "/team" }]
      : []),
  ];

  const isActive = (href) => {
    return activeItem === href;
  };

  const handleSmoothScroll = async (e, targetId) => {
    e.preventDefault();
    setActiveItem(targetId);

    if (
      targetId === "/" ||
      targetId === "/guidelines" ||
      targetId === "/faq" ||
      targetId === "/team"
    ) {
      if (window.location.pathname === targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await navigate(targetId);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (targetId === "#ps") {
        await navigate("/");
    
        setTimeout(() => {
          const target = document.querySelector(targetId);
          setActiveItem(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          
        }, 100);
      } else {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        const problemsSection = document.querySelector('#problems');
        const contactSection = document.querySelector('#contact');

        if (problemsSection && contactSection) {
          const problemsRect = problemsSection.getBoundingClientRect();
          const contactRect = contactSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (problemsRect.top >= 0 && problemsRect.top <= windowHeight / 2) {
            setActiveItem('#problems');
          } else if (contactRect.top >= 0 && contactRect.top <= windowHeight / 2) {
            setActiveItem('#contact');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/");
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
          padding: 2,
        }}
      >
        <Link to="/">
          <img
            height="40vw"
            width="140vw"
            src={Logo}
            alt="Logo"
            style={{ scale: "1.5", paddingLeft: "1rem" }}
          />
        </Link>
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
                  variant="h5"
                  fontWeight="bold"
                  component={Link}
                  to={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  sx={{
                    textDecoration: "none",
                    color: isActive(item.href) ? "primary.main" : "black",
                    fontSize: "16px",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      bottom: "-4px",
                      left: 0,
                      backgroundColor: "primary.main",
                      transform: isActive(item.href) ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
            <Box width="15rem">
              {!userData ? (
                <LoadingButton
                  onClick={() => login()}
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  paddingY="2rem"
                >
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Register Now
                  </Typography>
                </LoadingButton>
              ) : eventData?.Participant ? (
                <LoadingButton
                  onClick={() => logout()}
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  paddingY="2rem"
                >
                  Logout
                </LoadingButton>
              ) : (
                <LoadingButton
                  onClick={() => setopen(true)}
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  paddingY="2rem"
                >
                  Register Now
                </LoadingButton>
              )}
            </Box>
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
        height="max-content"
        border="1px solid grey"
        paddingBottom="1rem"
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
            onClick={(e) => {
              handleSmoothScroll(e, item.href);
              setIsMenuOpen(!isMenuOpen);
            }}
            sx={{
              textDecoration: "none",
              color: isActive(item.href) ? "primary.main" : "black",
              fontSize: "24px",
              fontWeight: "semi-bold",
              "&:hover": {
                color: "primary.main",
              },
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
