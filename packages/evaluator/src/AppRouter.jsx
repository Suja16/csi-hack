import "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllTeams from "./pages/AllTeams.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/evaluator/dashboard" />} />
      <Route path="/evaluator/dashboard" element={<AllTeams />} />
    </Routes>
  );
};

export default AppRouter;
