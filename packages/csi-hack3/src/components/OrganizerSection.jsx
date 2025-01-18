import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'motion/react';

import UnionBankLogo from '../assets/logos/unionBank.jpeg';
import SomaiyaLogo from '../assets/logos/somaiya.png';
import CSILogo from '../assets/logos/csiKJSCE.png';
import EuclidLogo from '../assets/logos/euclid.jpg';

const MotionPaper = motion(Paper);

const logoContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '160px',
  width: '100%'
};

const LogoContainer = ({ children }) => (
  <MotionPaper
    sx={logoContainerStyle}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </MotionPaper>
);

const LogoImage = ({ src, alt, style }) => (
  <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...style }} />
);

export default function OrganizersSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8edf5 100%)',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1a237e',
            mb: 6,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          HACKATHON ORGANISERS
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: '#455a64',
            maxWidth: '800px',
            mx: 'auto',
            mb: 6,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.8,
          }}
        >
          Welcome to our groundbreaking hackathon! We&apos;re thrilled to bring together the brightest minds in technology and innovation.
          This event is proudly presented by <strong>Union Bank</strong>, showcasing their commitment to fostering technological advancements in finance.
          In association with <strong>Somaiya</strong>, we&apos;re bridging academia and industry to create a unique learning experience.
          The hackathon is expertly organized by <strong>CSI</strong> (Computer Society of India) and <strong>Euclid</strong>,
          combining professional networking with cutting-edge problem-solving. Get ready to code, innovate, and shape the future!
        </Typography>

        <Box sx={{ display: 'grid', gap: 4 }}>
          <Box>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#5c6bc0',
                mb: 2,
                fontWeight: 500
              }}
            >
              Presented By
            </Typography>
            <LogoContainer>
              <LogoImage src={UnionBankLogo} alt="Union Bank Logo" />
            </LogoContainer>
          </Box>

          <Box>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#5c6bc0',
                mb: 2,
                fontWeight: 500
              }}
            >
              In Association With
            </Typography>
            <LogoContainer>
              <LogoImage src={SomaiyaLogo} alt="Somaiya Logo" style={{ maxWidth: "100%" }} />
            </LogoContainer>
          </Box>

          <Box>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#5c6bc0',
                mb: 2,
                fontWeight: 500
              }}
            >
              Organized By
            </Typography>
            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, justifyContent: 'center' }}>
              <LogoContainer>
                <LogoImage src={CSILogo} alt="CSI Logo" />
              </LogoContainer>
              <LogoContainer>
                <LogoImage src={EuclidLogo} alt="Euclid Logo" />
              </LogoContainer>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}:
