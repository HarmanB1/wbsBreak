
import { createRoot } from 'react-dom/client'
import { PublicLayout } from './pubLayout/publicLayout';
import '../index.css';

import { Dash } from './app/dash.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './landingPage/landing.jsx'
import { Features } from './landingPage/Feature.jsx'
import { Pricing } from './landingPage/Pricing.jsx'
import { StrictMode } from 'react';
import { SignUp } from './landingPage/signup.jsx';
import { LogIn } from './landingPage/login.jsx';
import { AuthProvider } from './util/authProvider.jsx';
import { PrivateLayout } from './privLayout/privLayout.jsx';
import { ProtectedRoute } from './util/protectedRoute.jsx';
import { Projects } from './app/projects.jsx';
import { Workspace } from './app/workspace.jsx';
import { ProjectDetail } from './projFiles/ProjectDetail.jsx';

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
  {
    path: "login",
    element: <LogIn />
  }, {
    path: "signup",
    element: <logIn />
  },
  {
    path: "/app",
    element: <ProtectedRoute><PrivateLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dash /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:projectId", element: <ProjectDetail /> },
      { path: "workspace", element: <Workspace /> },

    ]


  }




]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>
);
