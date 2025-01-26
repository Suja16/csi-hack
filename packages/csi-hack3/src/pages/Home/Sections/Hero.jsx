import {
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useCallback, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { animate, stagger } from "motion";
import { motion } from "motion/react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import RegistrationForm from "./RegistrationFrom";
import UserDataContext from "../../../contexts/userDataContext";

const buttonVariants = {
  initial: {
    scale: 1,
    backgroundSize: "200% 200%",
    backgroundPosition: "0% 50%",
  },
  hover: {
    scale: 1.05,
    backgroundPosition: "100% 50%",
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 300,
      backgroundPosition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  },
  tap: {
    scale: 0.95,
  },
};

const AnimatedTitle = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getFontSize = () => {
    if (isMobile) return "2.7rem";
    if (isTablet) return "3.5rem";
    return "4.8rem";
  };

  if (isMobile) {
    return (
      <div
        style={{
          overflow: "hidden",
          display: "inline-block",
          width: "100%",
          maxWidth: "90vw",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="overflow-hidden">
            {"iDEA".split("").map((letter, index) => (
              <motion.span
                key={`idea-${index}`}
                initial={{
                  x: index < "iDEA".length / 2 ? -100 : 100,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.abs(index - "iDEA".length / 2) * 0.06,
                  ease: [0.215, 0.61, 0.355, 1],
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.6 },
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  fontSize: getFontSize(),
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* HACKATHON Animation */}
          <div className="overflow-hidden">
            {"HACKATHON".split("").map((letter, index) => (
              <motion.span
                key={`hackathon-${index}`}
                initial={{
                  x: index < "HACKATHON".length / 2 ? -100 : 100,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.abs(index - "HACKATHON".length / 2) * 0.06,
                  ease: [0.215, 0.61, 0.355, 1],
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.6 },
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  fontSize: getFontSize(),
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version
  return (
    <div
      style={{
        overflow: "hidden",
        display: "inline-block",
        width: "100%",
        maxWidth: isTablet ? "90vw" : "80vw",
      }}
    >
      {"iDEA HACKATHON".split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{
            x: index < "iDEA HACKATHON".length / 2 ? -100 : 100,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
            delay: Math.abs(index - "iDEA HACKATHON".length / 2) * 0.06,
            ease: [0.215, 0.61, 0.355, 1],
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 },
          }}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            fontSize: getFontSize(),
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedWord = ({ word, isMobile }) => {
  const animateLetters = useCallback((elements) => {
    animate(
      elements,
      {
        opacity: [0, 1],
        y: [10, 0],
      },
      {
        delay: stagger(0.05),
        duration: 0.4,
      },
    );
  }, []);

  useEffect(() => {
    const letters = document.querySelectorAll(".animated-letter");
    animateLetters(letters);
  }, [word, animateLetters]);

  return (
    <>
      {word.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="animated-letter"
          style={{
            display: "inline-block",
            opacity: 0,
            fontSize: isMobile ? "1rem" : "inherit",
          }}
        >
          {letter}
        </span>
      ))}
    </>
  );
};

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    userData,
    setUserData,
    eventData,
    setEventData,
    loginLoading,
    setLoginLoading,
    isModalOpen,
    setIsModalOpen,
  } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(
        (prev) =>
          (prev + 1) %
          ["INNOVATION", "DEVELOPMENT", "EXECUTION", "ADVANCEMENT"].length,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      setLoginLoading(true);
      const response = await axios.post(
        "/api/v1/auth/googleToken",
        { code },
        { baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      setUserData(response.data.user);
      const participantResponse = await axios.post(
        `/api/v1/event/p/get/` + import.meta.env.VITE_EVENT_ID,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: import.meta.env.VITE_APP_SERVER_ADDRESS,
        },
      );
      setEventData(participantResponse.data.event);
      setLoginLoading(false);
      if (!participantResponse.data.event.Participant) {
        setIsModalOpen(true);
      } else {
        navigate("/team");
      }
    },
    flow: "auth-code",
  });

  const registerNow = () => {
    if (!userData) {
      login();
    } else if (!eventData?.Participant) {
      setIsModalOpen(true);
    } else {
      navigate("/team");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 3 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          component="div"
          variant={isMobile ? "h3" : "h1"}
          textAlign="center"
          color="primary"
          sx={{
            mt: isMobile ? 2 : 4,
            wordBreak: "break-word",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedTitle isMobile={isMobile} />
        </Typography>
      </motion.div>

      <Typography
        variant={isMobile ? "h5" : "h4"}
        textAlign="center"
        color="secondary"
        sx={{
          mt: isMobile ? 1 : 2,
          letterSpacing: { xs: "0.1rem", sm: "0.2rem", md: "0.3rem" },
          fontWeight: 500,
          fontSize: {
            xs: "1.2rem",
            sm: "1.5rem",
            md: "2rem",
          },
        }}
      >
        <AnimatedWord
          word={
            ["INNOVATION", "DEVELOPMENT", "EXECUTION", "ADVANCEMENT"][wordIndex]
          }
          isMobile={isMobile}
        />
      </Typography>

      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: isMobile ? "1rem" : "2rem",
          marginBottom: isMobile ? "1rem" : "2rem",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          style={{
            background:
              "linear-gradient(45deg, #00579C, #00579C, #B22629, #D9D9D9)",
            backgroundSize: "200% 200%",
            borderRadius: isMobile ? "6px" : "8px",
            padding: "2px",
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            onClick={registerNow}
            disabled={loginLoading}
            sx={{
              px: { xs: 3, sm: 3.5, md: 4 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              borderRadius: isMobile ? "4px" : "6px",
              fontSize: {
                xs: "1rem",
                sm: "1.2rem",
                md: "1.5rem",
              },
              fontWeight: 600,
              textTransform: "none",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              color: "white",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              },
            }}
          >
            {eventData?.Participant ? "View Team" : "Register Now"}
          </Button>
        </motion.div>
      </motion.div>

      <Typography
        variant="body1"
        textAlign="center"
        sx={{
          mt: { xs: 1, sm: 1.5, md: 2 },
          maxWidth: {
            xs: "95vw",
            sm: "80vw",
            md: "60vw",
          },
          mx: "auto",
          fontSize: {
            xs: "0.875rem",
            sm: "0.925rem",
            md: "1rem",
          },
          lineHeight: {
            xs: 1.5,
            sm: 1.6,
            md: 1.7,
          },
        }}
      >
        PSB Hackathon Series' brings to you, the iDEA Hackathon, presented by
        the Union Bank of India. One of the largest student led hackathon
        initiatives, under the guidance of Department of Financial Services,
        Indian Banks' Association and organised by Somaiya Vidyavihar University
      </Typography>
      <RegistrationForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Hero;
