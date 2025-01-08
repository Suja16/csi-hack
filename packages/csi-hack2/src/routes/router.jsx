import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router';


import HomePage from "../pages/HomePage"
import Guidelines from "../pages/Guidelines"
import Faq from "../pages/Faq"
import Team from "../pages/Team"

import Dalit from "../pages/dalit"

import NavFootLayout from "../layouts/NavFootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route Component={NavFootLayout}>
        <Route index Component={HomePage} />
        <Route path="guidelines" Component={Guidelines} />
        <Route path="faq" Component={() => <Faq isExpanded={true} />} />
        <Route path="team" Component={Team} />
        <Route path="dalit" Component={Dalit} />

      </Route>
    </Route>
  ),
);

export default router;
