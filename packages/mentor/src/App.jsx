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
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Feedback from "./pages/Feedback.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" Component={LoginLayout}>
        <Route index Component={Home} />
        <Route path="/feedback/:id" Component={Feedback} />
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
