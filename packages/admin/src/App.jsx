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

import AllTeams from "./pages/AllTeams.jsx";
import AddEvaluators from "./pages/Evaluators.jsx";
import LoginPage from "./pages/Login.jsx";
import Statistics from "./pages/Statistics.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" Component={LoginLayout}>
        <Route Component={NavSideLayout}>
          <Route index Component={AllTeams} />
          <Route path="addevaluators" Component={AddEvaluators} />
          <Route path="statistics" Component={Statistics} />
        </Route>
      </Route>
      <Route path="/login" Component={LoginPage} />
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
