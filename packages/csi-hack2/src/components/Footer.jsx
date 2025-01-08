import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, ArrowUpward } from "@mui/icons-material";

const Footer = () => {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      bgcolor="white"
      borderTop="1px solid #e0e0e0"
      position="fixed"
      bottom="0"
      width="100%"
      zIndex={30}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6" color="black">
          Follow Us:
        </Typography>
        <IconButton href="https://facebook.com" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank">
          <Instagram />
        </IconButton>
        <IconButton href="https://linkedin.com" target="_blank">
          <LinkedIn />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6" color="black">
          Contact Us
        </Typography>
        <IconButton onClick={(e) => handleSmoothScroll(e, "#contact")}>
          <ArrowUpward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
