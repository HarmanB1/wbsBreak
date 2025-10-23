
import { createRoot } from 'react-dom/client'
import './loggedIn/index.css'
import { PublicLayout } from './pubLayout/publicLayout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Landing} from './landingPage/landing.jsx'
import {Features} from './landingPage/Feature.jsx'
import {Pricing} from './landingPage/Pricing.jsx'
import { StrictMode } from 'react';




const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "features", element: <Features /> },
      { path: "Pricing", element: <Pricing /> },
    ],
  },



  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>

      <RouterProvider  router={router} />

  </StrictMode>
);
