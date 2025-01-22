import "./App.css";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AppRouter from "./AppRouter.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AppBarHeader from "./components/AppBarHeader.jsx";
import Sidebar from "./components/NewSidebar.jsx";
import { useTeams } from "./context/teamsContext.jsx";
import { useEffect } from "react";

function App() {
  const data = [
    {
      id: 1,
      name: "Terminator",
      youtube: "https://www.youtube.com/watch?v=V54CEElTF_U",
      ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
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
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { setTeams, selectedTeam, setSelectedTeam } = useTeams();

  useEffect(() => {
    setTeams(data);
    setSelectedTeam(data[0]);
  }, [setTeams]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  console.log(selectedTeam);
  return (
    <Router>
      <AppBarHeader />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar toggleSidebar={toggleSidebar} />
        <Box
          sx={{
            flex: 1,
            // padding: "1.05rem",
            marginTop: "4.5rem",
            height: "max-content",
            overflow: "hidden",
          }}
        >
          <AppRouter />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
