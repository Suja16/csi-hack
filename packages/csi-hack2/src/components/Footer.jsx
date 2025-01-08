import React from 'react';
import { Box, Typography, IconButton, Link, Container, Grid, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, ArrowUpward, Mail, Phone } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Computer Society of India KJSCE is dedicated to advancing the theory and practice of Computer Science and IT among students.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Link href="mailto:csi-kjsce@somaiya.edu" color="inherit" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Mail fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">csi-kjsce@somaiya.edu</Typography>
            </Link>
            <Link href="tel:+918657432101" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">+91 8657432101</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
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
          </Grid>
        </Grid>
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

