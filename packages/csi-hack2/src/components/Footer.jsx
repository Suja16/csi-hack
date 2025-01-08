import { Box, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, ArrowUpward, Mail, Phone } from "@mui/icons-material";

const Footer = () => {
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
        <Box>
          <Typography paddingLeft={1} variant="h6" color="black">
            Follow Us:
          </Typography>
          <Box>
            <IconButton href="https://www.facebook.com/share/18Lghv23Go/" target="_blank">
              <Facebook />
            </IconButton>
            <IconButton href="https://x.com/CSI_KJSCE?t=6TpZzpHM_7alwXvlEeQLcw&s=09" target="_blank">
              <Twitter />
            </IconButton>
            <IconButton href="https://www.instagram.com/csikjsce?igsh=NnExcjRxa3Q5Y2M4" target="_blank">
              <Instagram />
            </IconButton>
            <IconButton href="https://www.linkedin.com/company/csi---kjsce-student%27s-chapter/" target="_blank">
              <LinkedIn />
            </IconButton>
            <Typography>© 2024-25 Computer Society of India KJSCE. All rights reserved</Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h6" color="black">
          Contact Us
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Link href="mailto:info@example.com" color="textSecondary">
            <Box display="flex" alignItems="center" gap={1}>
              <Mail fontSize="small" />
              <Typography>csi-kjsce@somaiya.edu
              </Typography>
            </Box>
          </Link>
          <Link href="tel:+1234567890" color="textSecondary">
            <Box display="flex" alignItems="center" gap={1}>
              <Phone fontSize="small" />
              <Typography>+91 8657432101</Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
