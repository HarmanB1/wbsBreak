
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './loggedIN/scrum.jsx'
import{Sprint} from './loggedIN/sprint.jsx'
import {Proj} from './loggedIN/proj.jsx'
import { Wbs } from './loggedIN/wbs.jsx';
import { Layout} from './layout.jsx';
import { Setting } from './loggedIN/setting.jsx';
import { Profile } from './loggedIN/profile.jsx';
import { Stats } from './loggedIN/stats.jsx';

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
