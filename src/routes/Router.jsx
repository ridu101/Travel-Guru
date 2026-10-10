
import { createBrowserRouter } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";

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
]);
