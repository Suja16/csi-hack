import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';


import HomePage from "../pages/HomePage"
import Guidelines from "../pages/Guidelines"
import Faq from "../pages/Faq"

import NavFootLayout from "../layouts/NavFootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route Component={NavFootLayout}>
        <Route index Component={HomePage} />
        <Route path="guidelines" Component={Guidelines} />
        <Route path="faq" Component={Faq} />
      </Route>
    </Route>
  ),
);

export default router;
