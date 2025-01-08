import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import prizepool from "../assets/prizepool.png";
import Carousel from "react-material-ui-carousel";

const PrizePool = () => {
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
            height: 690,
            position: "absolute",
            top: 151,
            left: 0,
            // backgroundImage: "url(/Vector.svg)",
            backgroundSize: "100% 100%",
          }}
        />
        <svg
          width="1309"
          height="722"
          viewBox="0 0 1309 722"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 20C0 8.9543 8.9543 0 20 0H127.389C138.434 0 147.389 8.9543 147.389 20V77.781C147.389 88.8267 156.343 97.781 167.389 97.781H514.285C525.331 97.781 534.285 88.8267 534.285 77.781V20C534.285 8.95431 543.24 0 554.285 0H1289C1300.05 0 1309 8.95431 1309 20V702C1309 713.046 1300.05 722 1289 722H1214.77C1203.73 722 1194.77 713.046 1194.77 702V670.886C1194.77 659.84 1185.82 650.886 1174.77 650.886H827.877C816.831 650.886 807.877 659.84 807.877 670.886V702C807.877 713.046 798.923 722 787.877 722H20C8.95431 722 0 713.046 0 702V20Z"
            fill="white"
          />
        </svg>

        <Box
          component="img"
          src={prizepool}
          alt="Group"
          sx={{
            width: 404,
            // height: 330,
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
          sx={{ position: "absolute", top: 382, left: 120 }}
        >
          {["₹5L", "₹3L", "₹2L", "₹1L"].map((prize, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: 258,
                  height: 250,
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
                    fontSize: "5rem",
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
          borderRadius: 5,
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          padding: 3,
          gap: 3,
        }}
      >
        <Box
          width={"100%"}
          marginTop={-10}
          display={"flex"}
          justifyContent={"center"}
        >
          <img src={prizepool} alt="Group" style={{ width: "50%" }} />
        </Box>
        <Typography
          textAlign={"center"}
          variant="h4"
          color={"#e41d22"}
          fontWeight={"bold"}
        >
          PRIZE POOL
        </Typography>
        <Carousel>
          {["₹5L", "₹3L", "₹2L", "₹1L"].map((prize, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto", // Ensures horizontal scrolling
                width: 270,
                height: 150,
                backgroundColor: "#e41d22",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginX: "auto",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Montserrat-Bold, Helvetica",
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "5rem",
                  textAlign: "center",
                }}
              >
                {prize}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default PrizePool;
