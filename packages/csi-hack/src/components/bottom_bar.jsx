import "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

const BottomBar = () => {
  return (
    <Box
      sx={{
        py: 10,
        px: 10,
        backgroundColor: "#2846AA",
        color: "#fff",
        border: "3px solid white",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: { xs: "center", lg: "start" } }}
      >
        Contact Us
      </Typography>
      <Box>
        <Box width={"100%"} alignItems={"center"}>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "center", md: "center" },
              justifyContent: "space-between",
              width: "100%",
              gap: "16px",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box
              display="flex"
              width={"50%"}
              justifyContent={"space-between"}
              alignItems="center"
              sx={{
                flexDirection: { xs: "column", lg: "row" },
                marginTop: { xs: "20px", lg: "0" },
              }}
            >
              <Avatar
                sx={{
                  width: 250,
                  height: 250,
                  backgroundColor: "#F5F5F5",
                  marginBottom: { xs: "16px", md: "0" }, // Add margin bottom on small screens
                }}
              />

              <Box
                sx={{
                  marginTop: { xs: "20px", lg: "0" },
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Phone sx={{ marginRight: "12px", fontSize: 40 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "35px", marginX: { xs: "auto", lg: "0" } }}
                  >
                    1234567890
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Email sx={{ marginRight: "12px", fontSize: 40 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "35px", marginX: { xs: "auto", lg: "0" } }}
                  >
                    ABCDEF@gmail.com
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: "12px", fontSize: 40 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "35px", marginX: { xs: "auto", lg: "0" } }}
                  >
                    123, XXX, abc-0000
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                marginTop: { xs: "20px", lg: "0" },
              }}
            >
              <IconButton sx={{ color: "#fff" }}>
                <LinkedInIcon sx={{ fontSize: 70 }} />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon sx={{ fontSize: 70 }} />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <GitHubIcon sx={{ fontSize: 70 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBar;
