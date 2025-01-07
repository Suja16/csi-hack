import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/TeamPage/Header";
import Index from "./pages/Index";

function App() {
  const status = localStorage.getItem("status");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {status && <Route path="/header" element={<Header status={status} />} />}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;