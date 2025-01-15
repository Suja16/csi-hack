import "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllTeams from "./pages/AllTeams.jsx";
import AddEvaluators from "./pages/Evaluators.jsx";
import Statistics from "./pages/Statistics.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/allteams" />} />
      <Route path="/allteams" element={<AllTeams />} />
      <Route path="/evaluators" element={<AddEvaluators />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  );
};

export default AppRouter;