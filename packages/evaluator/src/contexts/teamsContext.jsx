import { createContext } from "react";

const data = {
  evaluation1: {},
  evaluation2: {},
  allTeams: {},
  refetch: () => {},
};

const TeamsContext = createContext(data);

export default TeamsContext;
