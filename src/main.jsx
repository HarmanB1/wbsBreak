
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './scrum.jsx'
import{Sprint} from './sprint.jsx'
import {Proj} from './proj.jsx'
import { Wbs } from './wbs.jsx';
import { Layout} from './layout.jsx';

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>sfsf</div>,
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
        path: "/sprint",
        element: <Sprint />,
      },
      {
        path: "/scrum",
        element: <Scrum />,
      },
      {
        path: "/wbs",
        element: <Wbs />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
