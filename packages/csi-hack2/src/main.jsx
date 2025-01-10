import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "../../ui/theme.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        scrollbarWidth: "thin",
        scrollbarColor: "#314e77 transparent",
      },
    }}
  />
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </ThemeProvider>
  </StrictMode>
);
