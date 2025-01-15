import "./App.css";
import { Box } from "@mui/material";
import { useState } from "react";
import AppRouter from "./AppRouter.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppBarHeader from "./components/AppBarHeader.jsx";
import Sidebar from "./components/NewSidebar.jsx";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <AppBarHeader
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Box
          sx={{
            flex: 1,
            padding: "1.05rem",
            paddingTop: "5rem",
            overflow: "auto",
          }}
        >
          <AppRouter />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
