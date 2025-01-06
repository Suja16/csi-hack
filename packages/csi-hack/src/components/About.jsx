import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
            marginBottom: 2,
          }}
        >
          KJSCE Devopia is an exciting event that promises to bring together the
          brightest minds in the country. It&apos;s a national-level offline
          Hackathon where you can showcase your skills in both hardware and
          software domains. Apart from the Hackathon, the event offers a wide
          range of entertaining games, unique and trendy gifts, and stylish swag
          items that you can get your hands on.
        </Typography>

        {/* Add Image */}
        <Box
          component="img"
          src="/grp.png"
          alt="Group"
          sx={{
            width: "90%", // Adjust width for mobile
            height: "auto", // Maintain aspect ratio
            borderRadius: 8, // Optional: Add rounded corners
            marginTop: 2,
          }}
        />
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
              left: 700,
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
            variant="body3"
            sx={{
              position: "absolute",
              width: 552,
              top: 160,
              maxHeight: 500,
              left: 73,
              color: "black",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "4px", // Thin scrollbar width
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "gray", // Thumb color
                borderRadius: "10px", // Rounded corners
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "darkgray", // Hover color
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent", // Track color
              },
              scrollbarWidth: "thin", // For Firefox
            }}
          >
            Welcome to IDEA, the Union Bank of India Hackathon, a groundbreaking
            initiative presented by Union Bank of India in collaboration with KJ
            Somaiya School of Engineering (KJSSE), Somaiya Vidyavihar University
            (SVU), the Indian Banks’ Association (IBA), and the Department of
            Financial Services (DFS). This hackathon represents a concerted
            effort under the Ministry of Finance’s vision to foster innovation
            and excellence in the realms of financial technology (fintech) and
            cybersecurity.
            <br />
            <br />
            This edition marks the first-ever partnership with the prestigious
            KJ Somaiya School of Engineering, bringing together bright minds
            from across the nation to solve real-world challenges. Over an
            intense 24-hour period, participants will tackle problem statements
            meticulously curated and vetted by Union Bank of India, ensuring
            their relevance to the current and future needs of the financial
            sector.
            <br />
            <br />
            We invite you to join us in this journey of innovation and
            discovery, where ideas become solutions and potential meets
            opportunity.
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
