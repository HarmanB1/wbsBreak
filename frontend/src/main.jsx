
import { createRoot } from 'react-dom/client'
import './loggedIn/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './loggedIn/dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './loggedIn/scrum.jsx'
import{Sprint} from './projFiles/sprint.jsx'
import {Proj} from './loggedIn/proj.jsx'
import { Wbs } from './projFiles/wbs.jsx';
import { PublicLayout } from './layout/pubLayout.jsx';
import { PrivateLayout } from './layout/privLayout.jsx';
import { Setting } from './loggedIn/setting.jsx';
import { Profile } from './loggedIn/profile.jsx';
import { Stats } from './loggedIn/stats.jsx';
import { Landing } from './landingPage/landing.jsx';
import { SignUp } from './landingPage/signup.jsx';
import { LogIn } from './landingPage/login.jsx';
import { Features } from './landingPage/Feature.jsx';
import { Pricing } from './landingPage/pricing.jsx';
import { ProjectIn } from './projFiles/projectIn.jsx';

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },

      { path: "features", element: <Features /> },
      { path: "Pricing", element: <Pricing /> },
    ],
  },
  {
    path: "/app",
    element: <PrivateLayout />,
    children: [
      { path:"dashboard", element: <Dash /> },
      { path: "stats", element: <Stats /> },
      { path: "settings", element: <Setting /> },
      {
        path: "projects",
        element: <Proj />,
        children: [
          { index: true, element: <Proj /> },
          {
            path: ":projectId",
            element: <ProjectIn />,
            children: [
              { index: true, element: <ProjectIn /> },
              { path: "wbs", element: <Wbs /> },
              { path: "sprint", element: <Sprint /> },
              { path: "scrum", element: <Scrum /> },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
