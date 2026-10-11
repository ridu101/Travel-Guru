
import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "destination/:slug",
        element: <DestinationDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
