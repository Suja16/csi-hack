import React, { createContext, useState, useContext } from "react";

const TeamsContext = createContext(null);

// TeamsProvider component that will wrap your app and provide the teams data
export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team A",
      youtube: "https://youtu.be/QuwzdyDCjak?si=1qCkneJ8HMO2Fjyq",
      ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
    },
    {
      id: 2,
      name: "Team B",
      youtube: "https://youtu.be/QuwzdyDCjak?si=1qCkneJ8HMO2Fjyq",
      ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
    },
    {
      id: 3,
      name: "Team C",
      youtube: "https://youtu.be/QuwzdyDCjak?si=1qCkneJ8HMO2Fjyq",
      ppt: "https://firebasestorage.googleapis.com/v0/b/hackathoncsi-9dc45.firebasestorage.app/o/files%2FRESUME.pdf32ec80d5-f066-4797-9d86-f16e11ed71ac?alt=media&token=193996af-e8fa-4ff3-acff-d046fc47e43b",
    },
  ]);

  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
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
