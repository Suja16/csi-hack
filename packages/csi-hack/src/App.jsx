import { Navigate, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./components/TeamPage/Header";
import Index from "./pages/Index";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const status = localStorage.getItem("status");
  const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/header");
  //   }
  // }, [accessToken, navigate]);
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {status && <Route path="/header" element={<Header status={status} />} />}
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
