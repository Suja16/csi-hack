import { Box, Typography } from '@mui/material'; // Importing necessary components from Material-UI
import React from 'react';

export default function Info() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 682 543">
      {/* Outer SVG with a path */}
      <path
        d="M1 21V522C1 533.046 9.95431 542 21 542H358.151C362.114 542 365.988 540.823 369.28 538.617L426.493 500.299C429.786 498.094 433.659 496.917 437.622 496.917H543.365C547.461 496.917 551.458 498.174 554.816 500.519L609.055 538.397C612.414 540.742 616.411 542 620.507 542H661C672.046 542 681 533.046 681 522V21C681 9.95431 672.046 1 661 1H370.961C366.594 1 362.347 2.42924 358.869 5.06947L314.156 39.0083C310.678 41.6485 306.431 43.0778 302.064 43.0778H172.979C168.612 43.0778 164.366 41.6485 160.887 39.0083L116.175 5.06947C112.697 2.42924 108.45 1 104.083 1H21C9.9543 1 1 9.95431 1 21Z"
        fill="white"
        stroke="black"
      />

      {/* Nested SVG centered within the outer SVG */}
      <svg width="90%" height="90%" viewBox="0 0 617 487" x="5%" y="5%">
        {/* Path inside the nested SVG */}
        <path
          d="M3 23V464C3 475.046 11.9543 484 23 484H323.347C327.277 484 331.12 482.842 334.395 480.671L384.833 447.245C388.109 445.074 391.952 443.917 395.882 443.917H517.58C521.755 443.917 525.826 445.223 529.221 447.653L574.779 480.263C578.174 482.693 582.245 484 586.42 484H594C605.046 484 614 475.046 614 464V23C614 11.9543 605.046 3 594 3H336.047C331.715 3 327.5 4.40662 324.036 7.00829L284.9 36.4028C281.436 39.0045 277.221 40.4111 272.889 40.4111H108.817C104.196 40.4111 99.7175 38.8111 96.1429 35.8829L61.5279 7.52818C57.9533 4.60004 53.475 3 48.8542 3H23C11.9543 3 3 11.9543 3 23Z"
          fill="white"
          stroke="#2846AA"
          strokeWidth="5"
        />
      </svg>

      {/* Centered Typography inside the nested SVG */}
      <foreignObject width="100%" height="100%" x="0" y="0">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center',
            color: 'black',
          }}
        >
          <Typography
                sx={{
                  position: "absolute",
                  color: "#2846AA",
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif"
                }}
              >
              
              <Typography sx={{ mt: 2, padding: '8px' }}>
  <span style={{ color: 'blue' }}><strong>Registration Deadline:</strong></span> 
  <span style={{ color: 'red' }}>5th Feb</span>
</Typography>

<Typography sx={{ padding: '8px' }}>
  <span style={{ color: 'blue' }}><strong>PPT Submission Deadline:</strong></span>
  <span style={{ color: 'red' }}>5th Feb</span>
</Typography>

<Typography sx={{ padding: '8px' }}>
  <span style={{ color: 'blue' }}><strong>Round 1 Results:</strong></span> 
  <span style={{ color: 'red' }}>5th Feb</span>
</Typography>

<Typography sx={{ padding: '8px' }}>
  <span style={{ color: 'blue' }}><strong>Hackathon Commences:</strong></span> 
  <span style={{ color: 'red' }}>5th Feb</span>
</Typography>

<Typography sx={{ padding: '8px' }}>
  <span style={{ color: 'blue' }}><strong>Hackathon Results:</strong></span> 
  <span style={{ color: 'red' }}>5th Feb</span>
</Typography>


              </Typography>
        </Box>
      </foreignObject>
    </svg>
  );
}
