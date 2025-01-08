import React from 'react';
import timeline from "../assets/timeline.png"
import { Box, useMediaQuery, Typography } from "@mui/material";

function Timeline(props) {
    const isMobile = useMediaQuery("(max-width:500px)")
    return (
        <Box sx={{
            width:"100%",
            display:'flex',
            justifyContent:"center",
            alignItems:'center',
            flexDirection:"column",
            gap:4,
            marginTop:"2rem",
        }}>
            <Typography variant={isMobile?'subtitle1':"h1"} sx={{textAlign:"center",letterSpacing:"1px" }}>PROCESS FLOW + TIMELINE</Typography>
            <img width="99%" src={timeline} alt="" />
        </Box>
    );
}

export default Timeline;