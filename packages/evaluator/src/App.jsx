import "./App.css";
import { Box } from "@mui/material";
import { useState } from "react";
import AppRouter from "./AppRouter.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppBarHeader from "./components/AppBarHeader.jsx";
import Sidebar from "./components/NewSidebar.jsx";
import { useTeams } from "./context/teamsContext.jsx";
import { useEffect } from "react";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { setTeams } = useTeams();

  useEffect(() => {
    setTeams([
      {
        id: 1,
        name: "Terminator",
        youtube: "https://youtu.be/QuwzdyDCjak?si=1qCkneJ8HMO2Fjyq",
        ppt: "https://www.youtube.com/watch?v=gbNIRFEBdS4",
      },
      {
        id: 2,
        name: "Team dad",
        youtube: "https://www.youtube.com/watch?v=X8oUKW2Eq80",
        ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
      },
      {
        id: 3,
        name: "TheRepublic",
        youtube: "https://www.youtube.com/watch?v=V_xro1bcAuA",
        ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
      },
    ]);
  }, [setTeams]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <AppBarHeader
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Box sx={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Box
          sx={{
            flex: 1,
            padding: "1.05rem",
            paddingTop: "5rem",
            overflow: "none",
            height: "max-content",
            width: "90vw",
          }}
        >
          <AppRouter />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
