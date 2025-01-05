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
        padding: {xs:2, lg:10},
        backgroundColor: "#2846AA",
        color: "#fff",
        border: "2px solid white",
        marginLeft: "1px",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: { xs: "center", lg: "start" } , fontSize:{xs:"30px", lg:"64px"} }}
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
              }}
            >
              <Avatar
                sx={{
                  width: {xs:150 , lg:200},
                  height: {xs:150 , lg:200},
                  backgroundColor: "#F5F5F5",
                  marginBottom: { xs: "16px", md: "0" }, // Add margin bottom on small screens
                }}
              />

              <Box
                sx={{
                  marginTop: { xs: "px", lg: "0" },
                  marginLeft:5
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Phone sx={{ marginRight: "12px", fontSize: 30 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "20px" , textAlign:"start" }}
                  >
                    1234567890
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Email sx={{ marginRight: "12px", fontSize: 30 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "20px", marginX: { xs: "auto", lg: "0" } }}
                  >
                    ABCDEF@gmail.com
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: "12px", fontSize: 30 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "20px", marginX: { xs: "auto", lg: "0" } }}
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
                <LinkedInIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <TwitterIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <GitHubIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBar;
