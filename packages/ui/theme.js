import { createTheme } from "@mui/material/styles";
import './fonts/fonts.css';

// Define your theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#00579C", // Primary color
    },
    secondary: {
      main: "#9c27b0", // Secondary color
    },
    error: {
      main: "#D20000",
    },
  },
  typography: {
    h1: {
      fontFamily: [],
    },
    fontFamily: '"Archigadget", "Roboto", "Helvetica", "Arial", sans-serif',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Archigadget';
          font-style: normal;
          font-weight: 400;
          src: url('https://fonts.cdnfonts.com/css/archigadget');
        }
      `,
    },
  },
});

export default theme;