
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './scrum.jsx'
import{Sprint} from './sprint.jsx'
import {Proj} from './proj.jsx'
import { Wbs } from './wbs.jsx';
import { Layout} from './layout.jsx';
import { Setting } from './setting.jsx';
import { Profile } from './profile.jsx';
import { Stats } from './stats.jsx';

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> }
    ]
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
            ]
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
