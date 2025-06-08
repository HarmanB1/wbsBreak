
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router'
import {dash} from './dash.js'
import { Component } from 'react';
//implment lazy later
const router = createBrowserRouter([
  {
    path: "/",
    Component: dash, 
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
