import "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import somaiyaLogo from "../assets/somaiya_logo.png";
import ibaLogo from "../assets/IBA_Logo.png";
import euclidLogo from "../assets/Euclid_logo.png";
import dfsLogo from "../assets/DFS_Logo.png";

const Banner = () => {
  const isMobile = useMediaQuery("(max-width:792px)");

  return (
    <Box
      sx={{
        width: "100vw",
        height: "max-content",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingX: "30px",
        paddingY: "20px",
        borderBottom: "1px solid #3f4147",
      }}
    >
      {/* "In Association With" wala section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: isMobile ? "20px" : "0",
            color: "#0166B3",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          IN ASSOCIATION WITH
        </Typography>
        <img
          src={somaiyaLogo}
          alt="Somaiya University"
          style={{
            width: "200px",
            height: "auto",
            marginLeft: isMobile ? "0" : "8px",
            marginRight: "10px",
            marginBottom: isMobile ? "10px" : "0",
          }}
        />
        <img
          src={euclidLogo}
          alt="IBA"
          style={{
            maxWidth: "200px",
            height: "auto",
            marginLeft: isMobile ? "0" : "8px",
          }}
        />
      </Box>

      {/* "Under Guidance Of" wala section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: isMobile ? "center" : "left",
          marginTop: isMobile ? "16px" : "0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginBottom: isMobile ? "8px" : "0",
            color: "#0166B3",
            fontWeight: "bold",
          }}
        >
          UNDER GUIDANCE OF
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "8px" : "16px",
            alignItems: "center",
            marginLeft: isMobile ? "0" : "8px",
          }}
        >
          <img
            src={ibaLogo}
            alt="IBA"
            style={{ width: "80px", height: "auto" }}
          />
          <img
            src={dfsLogo}
            alt="Department of Financial Services"
            style={{ maxWidth: "100px", height: "auto", marginRight: "10px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;

// <Box
//       sx={{
//         display: "flex",
//         flexDirection: isMobile ? "column" : "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         backgroundColor: "#fff",
//         paddingX: "30px",
//         paddingY: "20px",
//         borderRadius: "50px",
//         color: "#fff",
//         marginX: "5%",
//       }}
//     >
//       {/* "In Association With" wala section */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: isMobile ? "center" : "left",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             marginBottom: isMobile ? "20px" : "0",
//             color: "#0166B3",
//             marginRight: "10px",
//             fontWeight: "bold",
//           }}
//         >
//           IN ASSOCIATION WITH
//         </Typography>
//         <img
//           src={somaiyaLogo}
//           alt="Somaiya University"
//           style={{
//             maxWidth: "150px",
//             height: "auto",
//             marginLeft: isMobile ? "0" : "8px",
//             marginRight: "10px",
//             marginBottom: isMobile ? "10px" : "0",
//           }}
//         />
//         <img
//           src={euclidLogo}
//           alt="IBA"
//           style={{
//             maxWidth: "100px",
//             height: "auto",
//             marginLeft: isMobile ? "0" : "8px",
//           }}
//         />
//       </Box>

//       {/* "Under Guidance Of" wala section */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           alignItems: "center",
//           justifyContent: "center",
//           textAlign: isMobile ? "center" : "left",
//           marginTop: isMobile ? "16px" : "0",
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             marginBottom: isMobile ? "8px" : "0",
//             color: "#0166B3",
//             fontWeight: "bold",
//           }}
//         >
//           UNDER GUIDANCE OF
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             gap: isMobile ? "8px" : "16px",
//             alignItems: "center",
//             marginLeft: isMobile ? "0" : "8px",
//           }}
//         >
//           <img
//             src={ibaLogo}
//             alt="IBA"
//             style={{ maxWidth: "80px", height: "auto" }}
//           />
//           <img
//             src={dfsLogo}
//             alt="Department of Financial Services"
//             style={{ maxWidth: "100px", height: "auto", marginRight: "10px" }}
//           />
//         </Box>
//       </Box>
//     </Box>
