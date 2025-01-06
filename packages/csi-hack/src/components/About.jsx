import React from "react"
import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const About = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const scrollableTextBox = {
    maxHeight: "500px",
    overflowY: "auto",
    padding: 2,
    border: "0px solid #ddd",
    borderRadius: 4,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }

  if (isMobile) {
    return (
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Archigadget', Helvetica",
            fontWeight: 400,
            fontSize: 32,
            color: "#e41d22",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          About us
        </Typography>
        <Box
          sx={{
            ...scrollableTextBox,
            width: "90%",
            marginBottom: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Bai Jamjuree', Helvetica",
              fontWeight: 300,
              fontSize: 16,
              color: "black",
              textAlign: "center",
              lineHeight: "24px",
            }}
          >
            KJSCE Devopia is an exciting event that promises to bring together the brightest minds in the country. It&apos;s a national-level offline Hackathon where you can showcase your skills in both hardware and software domains. Apart from the Hackathon, the event offers a wide range of entertaining games, unique and trendy gifts, and stylish swag items that you can get your hands on.
          </Typography>
        </Box>

        <Box
          component="img"
          src="/grp.png"
          alt="Group"
          sx={{
            width: "90%",
            height: "auto",
            borderRadius: 8,
            marginTop: 2,
          }}
        />
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        sx={{
          backgroundImage: `url(/Vector.svg)`,
          backgroundSize: "100% 100%",
          width: 1309,
          height: 722,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 546,
            height: 458,
            top: 90,
            left: 691,
          }}
        />
        <Box sx={{ position: "relative", height: "100%" }}>
          <Box
            sx={{
              position: "absolute",
              width: 545,
              height: 458,
              top: 160,
              left: 600,
              borderRadius: 30,
            }}
          >
            <Box
              component="img"
              src="/grp.png"
              alt="Rectangle"
              sx={{
                position: "absolute",
                width: 545,
                height: 458,
                top: 0,
                objectFit: "cover",
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              position: "absolute",
              height: 70,
              top: 0,
              left: 186,
              color: "white",
              fontFamily: "Archigadget , Helvetica",
              fontWeight: 400,
              fontSize: 64,
              lineHeight: "70px",
              whiteSpace: "nowrap",
            }}
          >
            About us
          </Typography>

          <Box
            sx={{
              ...scrollableTextBox,
              position: "absolute",
              width: 552,
              top: 160,
              left: 73,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontFamily: "Bai Jamjuree , Helvetica",
                textAlign: "center",
                lineHeight: "24px",
                fontSize: 16,
                fontWeight: 300,
              }}
            >
              Welcome to IDEA, the Union Bank of India Hackathon, a groundbreaking initiative presented by Union Bank of India in collaboration with KJ Somaiya School of Engineering (KJSSE), Somaiya Vidyavihar University (SVU), the Indian Banks' Association (IBA), and the Department of Financial Services (DFS). This hackathon represents a concerted effort under the Ministry of Finance's vision to foster innovation and excellence in the realms of financial technology (fintech) and cybersecurity.
              <br /><br />
              This edition marks the first-ever partnership with the prestigious KJ Somaiya School of Engineering, bringing together bright minds from across the nation to solve real-world challenges. Over an intense 24-hour period, participants will tackle problem statements meticulously curated and vetted by Union Bank of India, ensuring their relevance to the current and future needs of the financial sector.
              <br /><br />
              We invite you to join us in this journey of innovation and discovery, where ideas become solutions and potential meets opportunity.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default About
