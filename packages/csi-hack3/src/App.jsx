import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import HomePage from "./pages/Home";
import Guidelines from "./pages/Guidelines";
import FAQ from "./pages/FAQ";
import Team from "./pages/Team";

import DataProvider from "./layouts/DataProvider";
import NavFootLayout from "./layouts/NavFootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={DataProvider}>
      <Route Component={NavFootLayout}>
        <Route index Component={HomePage} />
        <Route path="guidelines" Component={Guidelines} />
        <Route path="faq" Component={FAQ} />
        <Route path="team" Component={Team} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
