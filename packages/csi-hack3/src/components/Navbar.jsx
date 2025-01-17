import { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import UserDataContext from "../contexts/userDataContext";
import { motion } from "framer-motion";
import Logo from "../assets/logos/iDEA.png";
import RegistrationForm from "./registrationFrom";

const Navbar = ({ login, logout, open, setopen, isLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  const isMid = useMediaQuery("(max-width:1146px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, eventData } = useContext(UserDataContext);
  const containerRef = useRef(null);

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
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
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
      const problemsSection = document.querySelector('#ps');
      const contactSection = document.querySelector('#contact');

      if (problemsSection) {
        const problemsRect = problemsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if ((problemsRect.top >= 0 && problemsRect.top <= windowHeight / 2) || (problemsRect.bottom <= windowHeight && problemsRect.bottom >= windowHeight / 2)) {
          setActiveItem('#ps');
          return
        } else {
          if (location.pathname === '/') {
            setActiveItem('/');
          } else {
            setActiveItem(location.pathname);
          }
        }
      }

      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (contactRect.top >= 0 && contactRect.top <= windowHeight * 2 / 3) {
          setActiveItem('#contact');
          return
        } else {
          if (location.pathname === '/') {
            setActiveItem('/');
          } else {
            setActiveItem(location.pathname);
          }
        }
      }

    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const sidebarVariants = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        opacity: { duration: 0.3 }
      },
    }),
    closed: {
      clipPath: "circle(30px at calc(100% - 40px) 40px)",
      opacity: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
        opacity: { duration: 1.05 }
      },
    },
  };

  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <Box id="navbar">
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
            <Box width="16rem">
              {!userData ? (
                <LoadingButton
                  width="100%"
                  onClick={() => login()}
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  paddingY="2rem"
                  sx={{
                    width: "100%",
                  }}
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
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Logout
                  </Typography>
                </LoadingButton>
              ) : (
                <LoadingButton
                  width="100%"
                  onClick={() => setopen(true)}
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  paddingY="2rem"
                  sx={{
                    width: "100%",
                  }}
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
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </Box>
        )}
      </Box>

      {/* Mobile Menu */}
      <motion.div
        ref={containerRef}
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        custom={containerRef.current ? containerRef.current.offsetHeight : 1000}
        variants={sidebarVariants}
        style={{
          position: "fixed",
          top: "65px",
          right: "9px",
          zIndex: 30,
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "20px",
          width: "calc(100% - 18px)",
          overflow: "hidden",
        }}
      >
        <motion.ul
          variants={navVariants}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                handleSmoothScroll(e, item.href);
                setIsMenuOpen(false);
              }}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                fontWeight: "semi-bold",
                color: isActive(item.href) ? "primary.main" : "black",
              }}
            >
              {item.label}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </Box>
  );
};

export default Navbar;
