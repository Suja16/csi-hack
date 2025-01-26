import { createContext } from "react";

const data = {
  evaluatedTeams: {},
  nonEvaluatedTeams: {},
  allTeams: {},
  refetch: () => {},
};

const TeamsContext = createContext(data);

export default TeamsContext;
