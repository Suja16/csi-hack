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
import Login from "./pages/Login.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" Component={LoginLayout}>
        <Route Component={NavSideLayout}>
          <Route index Component={AllTeams} />
        </Route>
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
