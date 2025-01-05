import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import prizepool from "../assets/prizepool.png";

const PrizePool = () => {
  const scrollContainerRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        // Calculate new scroll position
        scrollAmount += 2; // Adjust the speed (higher value = faster scrolling)
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0; // Reset to the beginning when reaching the end
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth", // Smooth scrolling
        });
      }
    }, 50); // Adjust the interval time (smaller value = smoother scrolling)

    return () => clearInterval(scrollInterval); // Clean up on component unmount
  }, []);

  return (
    <>
      {/* Desktop View */}
      <Box
        sx={{
          width: "100%",
          height: 764,
          position: "relative",
          display: { xs: "none", md: "block" }, // Hide on small screens
        }}
      >
        <Box
          sx={{
            width: 1309,
            height: 613,
            position: "absolute",
            top: 151,
            left: 0,
            backgroundImage: "url(/Vector.svg)",
            backgroundSize: "100% 100%",
          }}
        />
        <Box
          component="img"
          src={prizepool}
          alt="Group"
          sx={{
            width: 404,
            height: 330,
            position: "absolute",
            top: 0,
            left: 142,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            top: 170,
            left: 650,
            fontFamily: "Archigadget-Regular, Helvetica",
            fontWeight: "normal",
            color: "#e41d22",
            fontSize: 64,
            letterSpacing: "-0.20px",
          }}
        >
          PRIZE POOL
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ position: "absolute", top: 382, left: 155 }}
        >
          {["₹5L", "₹3L", "₹2L", "₹1L"].map((prize, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: 238,
                  height: 200,
                  backgroundColor: "#e41d22",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: "Montserrat-Bold, Helvetica",
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "2rem",
                    textAlign: "center",
                    letterSpacing: "-0.20px",
                  }}
                >
                  {prize}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mobile View */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          display: { xs: "flex", md: "none" }, // Show only on small screens
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          gap: 3,
        }}
      >
        {/* Heading */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Archigadget-Regular, Helvetica",
            fontWeight: "bold",
            color: "#e41d22",
            textAlign: "center",
            mb: 2,
          }}
        >
          PRIZE POOL
        </Typography>

        {/* Horizontal Scrollable Container */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            padding: 2,
            width: "100%",
            justifyContent: "start",
            scrollBehavior: "smooth",
            "::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for a cleaner look
            },
          }}
        >
          {["₹5L", "₹3L", "₹2L", "₹1L"].map((prize, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto", // Ensures horizontal scrolling
                width: 200,
                height: 150,
                backgroundColor: "#e41d22",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Montserrat-Bold, Helvetica",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "1.5rem",
                  textAlign: "center",
                }}
              >
                {prize}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PrizePool;
