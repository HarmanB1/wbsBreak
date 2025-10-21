
import { createRoot } from 'react-dom/client'
import './loggedIn/index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


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
  { path: "/login", element: <LogIn /> },


  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuth>
      <RouterProvider  router={router} />
    </UserAuth>
  </StrictMode>
);
