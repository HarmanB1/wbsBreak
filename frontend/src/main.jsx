
import { createRoot } from 'react-dom/client'
import './loggedIn/index.css'
import { PublicLayout } from './pubLayout/publicLayout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Landing} from './landingPage/landing.jsx'
import {Features} from './landingPage/Feature.jsx'
import {Pricing} from './landingPage/Pricing.jsx'
import { StrictMode } from 'react';
import { SignUp } from './landingPage/signup.jsx';
import { LogIn } from './landingPage/login.jsx';
import { AuthProvider } from './util/authProvider.jsx';
const router = createBrowserRouter([
  {
    path: "jjj/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "features", element: <Features /> },
      { path: "Pricing", element: <Pricing /> },
    ],
  
  },
  {
    path: "login",
    element: <LogIn/>
  },{
    path: "signup",
    element: <logIn/>
  },
  {
    path: 
  }



  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>      <RouterProvider  router={router} />
</AuthProvider>

  </StrictMode>
);
