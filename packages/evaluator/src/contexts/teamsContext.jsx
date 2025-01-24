import { createContext } from "react";

const data = {
  teams: null,
  setTeams: () => {},
  selectedTeam: null,
  setSelectedTeam: () => {},
  refetch: () => {},
};

const TeamsContext = createContext(data);

export default TeamsContext;
