
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {dash} from './dash.js'
import { Component } from 'react';
import {scrum} from './scrum.js'
import{sprint} from './sprint.js'
import {proj} from './proj.js'

//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    Component: dash,
    errorElement: <div>sfjklsjfs</div>,
  },
  {
    path: "/proj",
    Component: proj,
  },
  {
    path: "/sprint",
    Component: sprint,
  },
  {
    path: "/scrum",
    Component: scrum,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
