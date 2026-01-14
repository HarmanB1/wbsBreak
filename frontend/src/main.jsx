
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
import { ProjectIn } from './projFiles/projectIn.jsx';

import { Breakdown } from './projFiles/projectInFiles/breakdown.jsx';
import { Timeline } from './projFiles/projectInFiles/timeline.jsx';
import { Context } from './projFiles/projectInFiles/context.jsx';
import { SettingProject } from './projFiles/projectInFiles/settings.jsx';

import { Wbs } from './projFiles/wbs.jsx';

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
  }, {
    path: "/app/projects/:projectId",
    element: <ProjectIn />,
    children: [
      { path: "breakdown", element: <Wbs /> },
      { path: "timeline", element: <Timeline /> },
      { path: "context", element: <Context /> },
      { path: "settings", element: <SettingProject /> },
    ]
  },

  {
    path: "/app",
    element: <ProtectedRoute><PrivateLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dash /> },
      { path: "projects", element: <Projects /> },
      { path: "workspace", element: <Workspace /> },

    ]


  },



]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>
);
