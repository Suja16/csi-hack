import { Box, Typography, IconButton, Link, Container, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, ArrowUpward, Mail, Phone } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        bottom: 0,
        position: 'relative',
        left: 0,
        right: 0,
        boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 32px)' } }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              The Computer Society of India - K.J. Somaiya College of Engineering Students' chapter is the largest student network in the college. Boasting a legacy of 20 years, the CSI-KJSCE is committed to providing tech enthusiasts an avenue to explore and collaborate with one another. With various workshops, hackathons, and competitions, we strive hard each time, to deliver on our motto - "We Develop to Inspire".
            </Typography>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 32px)' } }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Link href="mailto:csi-kjsce@somaiya.edu" color="inherit" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Mail fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>csi-kjsce@somaiya.edu</Typography>
            </Link>
            <Link href="tel:+918657432101" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>+91 8657432101</Typography>
            </Link>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 32px)' } }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton href="https://www.facebook.com/share/18Lghv23Go/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://x.com/CSI_KJSCE?t=6TpZzpHM_7alwXvlEeQLcw&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://www.instagram.com/csikjsce?igsh=NnExcjRxa3Q5Y2M4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://www.linkedin.com/company/csi---kjsce-student%27s-chapter/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', pb: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            © 2024-25 Computer Society of India KJSCE. All rights reserved
          </Typography>
          <IconButton
            onClick={handleScrollToTop}
            color="inherit"
            aria-label="Scroll to top"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <ArrowUpward />
          </IconButton>
        </Box>
      </Container>

      {!isMobile && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #45B7D1)',
          }}
        />
      )}
    </Box>
  );
};

export default Footer;
