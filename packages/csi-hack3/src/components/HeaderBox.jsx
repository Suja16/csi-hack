import { Box, Typography, useTheme } from "@mui/material";

const HeaderBox = ({ header, children }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" height="100%">
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
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: "0 0 10px 10px",
          padding: 2,
          bgcolor: "white",
          textWrap: "wrap",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HeaderBox;
