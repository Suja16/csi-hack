import {
  Box,
  Typography,
  IconButton,
  Link,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowUpward,
  Mail,
  Phone,
} from "@mui/icons-material";
import CsiLogo from "../assets/csiLogo.png";
import EuclidLogo from "../assets/EuclidLogoFooter.jpg";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        bottom: 0,
        position: "relative",
        left: 0,
        right: 0,
        boxShadow: "0px -2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 6,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: { xs: "1 1 100%", sm: "0 1 45%" } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                About Us
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.875rem", textAlign: "justify" }}
            >
              Welcome to iDEA, the Union Bank of India Hackathon, a
              groundbreaking initiative of the Union Bank of India in
              collaboration with KJ Somaiya School of Engineering (KJSSE),
              Somaiya Vidyavihar University (SVU) and under the guidance of the
              Indian Banks' Association (IBA), and the Department of Financial
              Services (DFS). This hackathon represents a concerted effort under
              the Ministry of Finance's vision to foster innovation and
              excellence in the realms of financial technology (fintech) and
              cybersecurity.
            </Typography>
          </Box>

          <Box sx={{ flex: { xs: "1 1 100%", sm: "0 0 auto" } }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "justify" }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Link
                href="mailto:csi-kjsce@somaiya.edu"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Mail fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                  euclid-kjsce@somaiya.edu
                </Typography>
              </Link>
              <Link
                href="mailto:csi-kjsce@somaiya.edu"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Mail fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                  csi-kjsce@somaiya.edu
                </Typography>
              </Link>
              <Link
                href="tel:+918657432101"
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                  +91 8657432101
                </Typography>
              </Link>
              <Box>
                <img
                  src={CsiLogo}
                  alt="CSI Logo"
                  style={{
                    height: '100px',
                    width: 'auto'
                  }}
                />
                <img
                  src={EuclidLogo}
                  alt="CSI Logo"
                  style={{
                    height: '55px',
                    width: 'auto',
                    marginBottom: '1.7rem',
                    marginLeft: '1rem'
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ flex: { xs: "1 1 100%", sm: "0 0 auto" } }}>
            <Typography
              paddingLeft="0.6rem"
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "justify" }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
              <IconButton
                href="https://www.facebook.com/share/18Lghv23Go/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://x.com/CSI_KJSCE?t=6TpZzpHM_7alwXvlEeQLcw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/csikjsce?igsh=NnExcjRxa3Q5Y2M4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                color="inherit"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/company/csi---kjsce-student%27s-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.2)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            pb: 2,
          }}
        >
          <Typography variant="body2" sx={{ mr: 2, textAlign: "justify" }}>
            © 2024-25 Computer Society of India KJSCE. All rights reserved
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, textAlign: "justify" }}>
            Made with <span style={{ color: 'red' }}>❤</span> by CSI-KJSCE
          </Typography>
          <IconButton
            onClick={handleScrollToTop}
            color="inherit"
            aria-label="Scroll to top"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <ArrowUpward />
          </IconButton>
        </Box>
      </Container>

      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1)",
          }}
        />
      )}
    </Box>
  );
};

export default Footer;
