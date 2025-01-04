import 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid2';

const BottomBar = () => {
    return (
        <Box sx={{ py: 10, px: 10, backgroundColor: '#2846AA', color: '#fff', border: "3px solid white" }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Us
            </Typography>
            <Grid container spacing={4} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: { xs: 'center', md: 'flex-start' }, gap: '16px', flexDirection: { xs: 'column', md: 'row' } }}>
                        {/* Avatar Section */}
                        <Avatar
                            sx={{
                                width: 150,
                                height: 150,
                                backgroundColor: '#F5F5F5',
                                marginBottom: { xs: '16px', md: '0' },  // Add margin bottom on small screens
                            }}
                        />
                        {/* Contact Details */}
                        <Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Phone sx={{ marginRight: '12px', fontSize: 28 }} />
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>
                                    1234567890
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Email sx={{ marginRight: '12px', fontSize: 28 }} />
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>
                                    ABCDEF@gmail.com
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <LocationOn sx={{ marginRight: '12px', fontSize: 28 }} />
                                <Typography variant="body1" sx={{ fontSize: '20px' }}>
                                    123, XXX, abc-0000
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ gap: '12px' }}
                >
                    <IconButton sx={{ color: '#fff' }}>
                        <LinkedInIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <TwitterIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <IconButton sx={{ color: '#fff' }}>
                        <GitHubIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BottomBar;
