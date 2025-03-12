import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import UserDataContext from "./contexts/userDataContext";

import LoginLayout from "./layouts/LoginLayout.jsx";
import NavSideLayout from "./layouts/NavSideLayout.jsx";

import TeamDetails from "./pages/TeamDetails.jsx";
import AllDone from "./pages/AllDone.jsx";
import Login from "./pages/Login.jsx";
import JudgesDashboard from "./pages/JudgesDashboard.jsx";
import OFEvaluatorDashboard from "./pages/OFEvaluatorDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" Component={LoginLayout}>
        <Route Component={NavSideLayout}>
          <Route index Component={AllDone} />
          <Route path="teams/:id" Component={TeamDetails} />
        </Route>
        <Route path="judges-dashboard" Component={JudgesDashboard} />
        <Route path="of-evaluator-dashboard" Component={OFEvaluatorDashboard} />
      </Route>
      <Route path="/login" Component={Login} />
    </Route>,
  ),
);

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <RouterProvider router={router} />
    </UserDataContext.Provider>
  );
}

export default App;
