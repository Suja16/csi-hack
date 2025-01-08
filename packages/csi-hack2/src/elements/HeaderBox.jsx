import { Box, Typography, useTheme } from "@mui/material";

const HeaderBox = ({header, children}) => {
  const theme = useTheme();
  return (
    <Box >
      <Box
        bgcolor={theme.palette.primary.main}
        sx={{
          borderRadius: "10px 10px 0 0",
          padding: 2,
        }}
      >
        <Typography variant="h5" color="white">
          {header}
        </Typography>
      </Box>
      <Box width="100%" minHeight="60vh" sx={{
        borderRadius: "0 0 10px 10px",
        padding: 2,
        bgcolor: "white",
        "text-wrap": "wrap",
      }}>
        {children}
      </Box>
    </Box>
  );
}

export default HeaderBox;
