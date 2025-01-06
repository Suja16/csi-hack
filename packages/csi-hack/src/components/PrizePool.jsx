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
                    fontSize: "4rem",
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
        <Box width={"100%"} marginTop={-10} display={"flex"} justifyContent={"center"} >
          <img src={prizepool} alt="Group" style={{ width: "50%" }} />
        </Box>
        <Typography textAlign={"center"} variant="h4" color={"#e41d22"} fontWeight={"bold"}>
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
