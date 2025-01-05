import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    // Mobile UI
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
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Bai Jamjuree', Helvetica",
            fontWeight: 300,
            fontSize: 16,
            color: "black",
            textAlign: "center",
            lineHeight: "24px",
            maxWidth: "90%",
          }}
        >
          KJSCE Devopia is an exciting event that promises to bring together the brightest minds in the country. It&apos;s a national-level offline Hackathon where you can showcase your skills in both hardware and software domains. Apart from the Hackathon, the event offers a wide range of entertaining games, unique and trendy gifts, and stylish swag items that you can get your hands on.
        </Typography>
      </Box>
    );
  }

  // Desktop UI
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
            variant="body1"
            sx={{
              position: "absolute",
              width: 552,
              top: 160,
              left: 73,
              color: "black",
              fontFamily: "Bai Jamjuree , Helvetica",
              textAlign: "center",
              lineHeight: "42px",
              fontSize: 32,
              fontWeight: 300,
            }}
          >
            KJSCE Devopia is an exciting event that promises to bring together
            the brightest minds in the country. It&apos;s a national-level
            offline Hackathon where you can showcase your skills in both
            hardware and software domains. Apart from the Hackathon, the event
            offers a wide range of entertaining games, unique and trendy gifts,
            and stylish swag items that you can get your hands on.
          </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default About;
