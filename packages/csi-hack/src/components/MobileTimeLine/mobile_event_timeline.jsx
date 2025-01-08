import { Box, Container, Divider } from "@mui/material";
import "react";
import MobileTimelineCard from "./mobile_timeline_card";

const MobileEventTimeLine = () => {
    return (
        <Container maxWidth="sm" sx={{ bgcolor: '#2846AA', py: 4, position: 'relative' }}>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: 'white',
                        zIndex: 1,
                        height: '80%',
                    }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
                        <MobileTimelineCard number={1} text="Problem Statement Launch" />
                    </Box>
                    <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
                        <MobileTimelineCard number={2} text="Registration Begins" />
                    </Box>
                    <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
                        <MobileTimelineCard number={3} text="Registration Ends" />
                    </Box>
                    <Box sx={{ mb: 3, position: 'relative', width: '100%' }}>
                        <MobileTimelineCard number={4} text="Submission Deadline" />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default MobileEventTimeLine;