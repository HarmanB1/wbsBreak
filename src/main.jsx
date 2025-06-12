
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {Dash} from './dash.jsx'
import { StrictMode } from "react";
import {Scrum} from './scrum.jsx'
import{Sprint} from './sprint.jsx'
import {Proj} from './proj.jsx'

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dash />,
    errorElement: <div>sfjklsjfs</div>,
  },
  {
    path: "/proj",
    Component: <Proj/>,
  },
  {
    path: "/sprint",
    element: <Sprint/>,
  },
  {
    path: "/scrum",
    element: <Scrum/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
