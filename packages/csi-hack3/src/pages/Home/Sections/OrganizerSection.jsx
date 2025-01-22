import { Box, Container, Typography, Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { motion } from "framer-motion";
import UnionBankLogo from "@assets/logos/unionBank.jpeg";
import SomaiyaLogo from "@assets/logos/somaiya.svg";
import CSILogo from "@assets/logos/csiKJSCE.png";
import EuclidLogo from "@assets/logos/euclid.png";
import DFSLogo from "@assets/logos/DFS.png";
import IBALogo from "@assets/logos/IBA.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const SECTION_DIMENSIONS = {
  single: {
    height: 160,
    maxWidth: '500px',
    logoWidth: '80%'
  },
  double: {
    height: 160,
    logoWidth: '80%'
  }
};

const OrganizersSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #ffffff 0%, #80d2f2 100%)',
        padding: (theme) => theme.spacing(10, 0),
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/path/to/subtle-pattern.png")',
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 900,
            color: 'primary.main',
            marginBottom: (theme) => theme.spacing(6),
            textTransform: 'uppercase',
            position: 'relative',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            width: '100%',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px',
            },
          }}
        >
          Hackathon Organizers
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: 'text.secondary',
            maxWidth: '900px',
            mx: 'auto',
            mb: 8,
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.8,
            fontWeight: 400,
            px: { xs: 2, sm: 4 },
            width: '100%'
          }}
        >
          Join us for an extraordinary hackathon experience, where innovation meets opportunity. Presented by <strong>Union Bank</strong> and guided by <strong>IBA</strong> and <strong>DFS</strong>, this event bridges the gap between academia and industry. In collaboration with <strong>Somaiya</strong>, and organized by the <strong>Computer Society of India (CSI)</strong> and <strong>Euclid</strong>, we're creating a unique platform for you to network, solve complex problems, and shape the future through code and creativity.
        </Typography>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ 
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <Grid2 
            container 
            spacing={4} 
            sx={{ 
              width: '100%',
              margin: '0 auto',
              justifyContent: 'center'
            }}
          >
            {/* Left Column */}
            <Grid2 
              xs={12} 
              md={6} 
              container 
              spacing={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '0'
              }}
            >
              {/* Presented By */}
              <Grid2 xs={12} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SectionTitle title="Presented By" />
                <Box sx={{ width: '100%', maxWidth: SECTION_DIMENSIONS.single.maxWidth, margin: '0 auto' }}>
                  <LogoContainer type="single">
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: '100%',
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem'
                      }}
                    >
                      <img 
                        src={UnionBankLogo} 
                        alt="Union Bank" 
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }} 
                      />
                    </Box>
                  </LogoContainer>
                </Box>
              </Grid2>

              {/* In Association With */}
              <Grid2 xs={12} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SectionTitle title="In Association With" />
                <Box sx={{ width: '100%', maxWidth: SECTION_DIMENSIONS.single.maxWidth, margin: '0 auto' }}>
                  <LogoContainer type="single">
                    <Box 
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem'
                      }}
                    >
                      <img 
                        src={SomaiyaLogo} 
                        alt="Somaiya" 
                        style={{ 
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }} 
                      />
                    </Box>
                  </LogoContainer>
                </Box>
              </Grid2>
            </Grid2>

            {/* Right Column */}
            <Grid2 
              xs={12} 
              md={6} 
              container 
              spacing={4}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                margin: '0'
              }}
            >
              {/* Under The Guidance Of */}
              <Grid2 xs={12} sx={{ width: '100%' }}>
                <SectionTitle title="Under The Guidance Of" />
                <Grid2 
                  container 
                  spacing={2} 
                  sx={{ 
                    justifyContent: 'center',
                    margin: '0',
                    width: '100%'
                  }}
                >
                  <Grid2 xs={6}>
                    <LogoContainer type="double">
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img 
                          src={DFSLogo} 
                          alt="DFS" 
                          style={{ 
                            maxWidth: SECTION_DIMENSIONS.double.logoWidth,
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }} 
                        />
                      </Box>
                    </LogoContainer>
                  </Grid2>
                  <Grid2 xs={6}>
                    <LogoContainer type="double">
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img 
                          src={IBALogo} 
                          alt="IBA" 
                          style={{ 
                            maxWidth: SECTION_DIMENSIONS.double.logoWidth,
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }} 
                        />
                      </Box>
                    </LogoContainer>
                  </Grid2>
                </Grid2>
              </Grid2>

              {/* Organized By */}
              <Grid2 xs={12} sx={{ width: '100%' }}>
                <SectionTitle title="Organized By" />
                <Grid2 
                  container 
                  spacing={2} 
                  sx={{ 
                    justifyContent: 'center',
                    margin: '0',
                    width: '100%'
                  }}
                >
                  <Grid2 xs={6}>
                    <LogoContainer type="double">
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img 
                          src={CSILogo} 
                          alt="CSI" 
                          style={{ 
                            maxWidth: SECTION_DIMENSIONS.double.logoWidth,
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }} 
                        />
                      </Box>
                    </LogoContainer>
                  </Grid2>
                  <Grid2 xs={6}>
                    <LogoContainer type="double">
                      <Box 
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          display: 'flex', 
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <img 
                          src={EuclidLogo} 
                          alt="Euclid" 
                          style={{ 
                            maxWidth: SECTION_DIMENSIONS.double.logoWidth,
                            maxHeight: '100%',
                            objectFit: 'contain'
                          }} 
                        />
                      </Box>
                    </LogoContainer>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

const SectionTitle = ({ title }) => (
  <Typography
    variant="h5"
    align="center"
    sx={{
      fontWeight: 600,
      color: 'text.secondary',
      marginBottom: (theme) => theme.spacing(3),
      position: 'relative',
      fontSize: { xs: '1.25rem', sm: '1.5rem' },
      width: '100%',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50px',
        height: '3px',
        backgroundColor: 'primary.main',
      },
    }}
  >
    {title}
  </Typography>
);

const LogoContainer = ({ children, type = 'single' }) => (
  <Paper
    component={motion.div}
    variants={itemVariants}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: (theme) => theme.spacing(3),
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      height: SECTION_DIMENSIONS[type].height,
      width: '100%',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
      },
    }}
  >
    {children}
  </Paper>
);

export default OrganizersSection;
