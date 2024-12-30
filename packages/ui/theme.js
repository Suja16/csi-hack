import { createTheme } from "@mui/material/styles";

// Define your theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#00579C", // Primary color
    },
    secondary: {
      main: "#9c27b0", // Secondary color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
