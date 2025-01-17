import {
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useCallback, useState } from "react";
import { animate, stagger } from "motion";
import { motion } from "motion/react";

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

const AnimatedTitle = () => (
  <div style={{ overflow: "hidden", display: "inline-block", width: "100%" }}>
    {"IDEA HACKATHON".split("").map((letter, index) => (
      <motion.span
        key={index}
        initial={{
          x: index < "IDEA HACKATHON".length / 2 ? -100 : 100,
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
          delay: Math.abs(index - "IDEA HACKATHON".length / 2) * 0.06,
          ease: [0.215, 0.61, 0.355, 1],
          opacity: { duration: 0.4 },
          scale: { duration: 0.6 },
        }}
        style={{
          display: "inline-block",
          whiteSpace: "pre",
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3.5rem",
          },
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {letter}
      </motion.span>
    ))}
  </div>
);

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
              "linear-gradient(-45deg, #00579C, #B22629, #00579C, #D9D9D9)",
            backgroundSize: "200% 200%",
            borderRadius: isMobile ? "6px" : "8px",
            padding: "2px",
          }}
        >
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            sx={{
              px: { xs: 3, sm: 3.5, md: 4 },
              py: { xs: 1, sm: 1.25, md: 1.5 },
              borderRadius: isMobile ? "4px" : "6px",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.1rem",
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
            Register Now
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
        Welcome to iDEA, the Union Bank of India Hackathon, a groundbreaking
        initiative of the Union Bank of India in collaboration with KJ Somaiya
        School of Engineering (KJSSE), Somaiya Vidyavihar University (SVU) and
        under the guidance of the Indian Banks&apos; Association (IBA), and the
        Department of Financial Services (DFS). This hackathon represents a
        concerted effort under the Ministry of Finance&apos;s vision to foster
        innovation and excellence in the realms of financial technology
        (fintech) and cybersecurity.
      </Typography>
    </Container>
  );
};

export default Hero;
