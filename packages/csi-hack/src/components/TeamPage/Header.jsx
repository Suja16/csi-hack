import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BottomBar from "../bottom_bar";
import FAQSection from "../faq";
import Info from "./Info";
import TeamCard from "./TeamCard";

const HackathonPage = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    
      useEffect(() => {
        // Set the target date for the hackathon (23rd February 2025)
        const hackathonStartDate = new Date("February 23, 2025 00:00:00").getTime();
    
        // Function to update the countdown
        const updateCountdown = () => {
          const now = new Date().getTime();
          const distance = hackathonStartDate - now;
    
          if (distance <= 0) {
            // If the countdown ends, stop updating
            setTimeLeft({
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
            return;
          }
    
          // Calculate remaining days, hours, minutes, and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
          setTimeLeft({ days, hours, minutes, seconds });
        };
    
        // Update the countdown every second
        const intervalId = setInterval(updateCountdown, 1000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);
  return (
    <Box
      sx={{
        backgroundColor: "#003d99",
        color: "#fff",
        padding: "1.25rem", // 20px
        
        
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          height: "100%",
          paddingBottom: "10%"
        }}
      >
        {/* Speech Bubble */}
        <Box
          sx={{
            position: "relative",
            width: "80%",
          }}
        >
          <svg width="100%" viewBox="0 0 1284 333" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 202V50C0 22.3858 22.3857 0 50 0H1234C1261.61 0 1284 22.3858 1284 50V219.506C1284 239.266 1272.36 257.172 1254.31 265.197L1111.66 328.595C1087.23 339.452 1058.59 329.175 1046.63 305.265L1033.82 279.639C1025.35 262.7 1008.04 252 989.098 252H50C22.3858 252 0 229.614 0 202Z"
              fill="white"
            />
          </svg>
          <Box
            sx={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "80%",
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                color: "#FF0000",
                paddingTop: "5%",
                fontSize: {
                  xs: "2.8vw", // 4% of viewport width for small screens
                  sm: "3.5vw", // 3.5% of viewport width for medium screens
                  md: "2.5rem", // Fixed size for larger screens
                },
              }}
            >
              WELCOME ONI TO TEAM BYTEME
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#555555",
                fontSize: {
                  xs: "2.5vw", // 3% of viewport width for small screens
                  sm: "1.5vw", // 2.5% of viewport width for medium screens
                  md: "1.15rem", // Fixed size for larger screens
                },
              }}
            >
              YOU'RE ALL SET TO ATTEND THIS HACKATHON
            </Typography>
          </Box>
        </Box>

        {/* Red Rectangle */}
        <Box
          sx={{
            position: "absolute", // Keep it fixed within the parent container
            top: "55%", // Align it to the bottom
            width: "63%",
            left: "10%", // -8px
          }}
        >
          <svg width="100%" height="auto" viewBox="0 0 1029 174" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 30C0 13.4315 13.4315 0 30 0H968.774C979.544 0 989.488 5.77379 994.828 15.1277L1024.98 67.9465C1029.98 76.7181 1030.24 87.4206 1025.66 96.4226L994.535 157.604C989.416 167.664 979.084 174 967.796 174H30C13.4314 174 0 160.569 0 144V30Z"
              fill="#E41D22"
            />
          </svg>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              width: "90%",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: "#FFFFFF",
                fontSize: {
                  xs: "2vw", // 3% of viewport width for small screens
                  sm: "2.5vw", // 2.5% of viewport width for medium screens
                  md: "1.5rem", // Fixed size for larger screens
                },
              }}
            >
              {`HACKATHON BEGINS IN ${timeLeft.days} DAYS : ${timeLeft.hours} HOURS : ${timeLeft.minutes} MINUTES : ${timeLeft.seconds} SECONDS`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start", // Adjust alignment based on your design needs
          gap: "2.5rem", // 40px
          width: "100%", // Adjust based on parent container
        }}
      >
        <TeamCard />
        <Info />
        
      </Box>
      
      <FAQSection/>
      <BottomBar/>
    </Box>
  );
};

export default HackathonPage;
