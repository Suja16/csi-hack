import { useMediaQuery } from "@mui/material";
import React, { createContext, useState, useContext } from "react";

const TeamsContext = createContext(null);

// TeamsProvider component that will wrap your app and provide the teams data
export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");


  return (
    <TeamsContext.Provider value={{ teams, setTeams , selectedTeam, setSelectedTeam , isSidebarOpen, setSidebarOpen , isMobile}}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used within a TeamsProvider");
  }
  return context;
};
