import { useState } from "react"; // For example, you can use localStorage, Context, etc.
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import AllTeams from "./pages/AllTeams.jsx";
import AddEvaluators from "./pages/Evaluators.jsx";
import LoginPage from "./pages/Login.jsx";
import Statistics from "./pages/Statistics.jsx";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Set this based on your login status logic


  return (
    <Routes>
      <Route path="/" element={<LoginPage  isAuthenticated= {isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} />  {/* LoginPage for the root route */}
      
      {/* Protected routes */}
      <Route
        path="/allteams"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AllTeams />} />}
      />
      <Route
        path="/evaluators"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AddEvaluators />} />}
      />
      <Route
        path="/statistics"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Statistics />} />}
      />
    </Routes>
  );
};

export default AppRouter;
