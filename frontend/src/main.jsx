
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
    element: <Layout />,
    errorElement: <div>sfsfk</div>,
    children: [
      {
        index: true,
        element: <Dash />,
      },
      {
        path: "/project",
        element: <Proj />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
       {
        path: "/profile/:id",
        element: <Profile />,
        children: [
            {
              path: "/wbs",
              element: <Wbs />,
            },
            {
              path: "/sprint",
              element: <Sprint />,
            },
            {
              path: "/scrum",
              element: <Scrum />
            }
        ]
      },

    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Setting />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
