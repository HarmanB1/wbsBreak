
import { createRoot } from 'react-dom/client'
import './loggedIn/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './loggedIn/dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './loggedIn/scrum.jsx'
import{Sprint} from './loggedIn/sprint.jsx'
import {Proj} from './loggedIn/proj.jsx'
import { Wbs } from './loggedIn/wbs.jsx';
import { Layout} from './layout.jsx';
import { Setting } from './loggedIn/setting.jsx';
import { Profile } from './loggedIn/profile.jsx';
import { Stats } from './loggedIn/stats.jsx';

import { Landing } from './landingPage/landing.jsx';
import { SignUp } from './landingPage/signup.jsx';
import { LogIn } from './landingPage/login.jsx';
import { Doc } from './landingPage/doc.jsx';
import { Pricing } from './landingPage/pricing.jsx';

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "signup", element: <Signup /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <Dash /> },
      { path: "stats", element: <Stats /> },
      { path: "settings", element: <Setting /> },
      {
        path: "projects",
        element: <ProjectsLayout />,
        children: [
          { index: true, element: <Proj /> },
          { path: "new", element: <Proj /> },
          {
            path: ":projectId",
            element: <ProjectLayout />,
            children: [
              { index: true, element: <ProjectOverview /> },
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
