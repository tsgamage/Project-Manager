import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ViewProjectPage from "./pages/ViewProject";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout/>,
            children: [
                {index: true, element: <HomePage/>},
                {
                    path: "project",
                    children: [
                        {path: "new", element: <p>Helloooooo</p>},
                        {path: "view/:projectID", element: <ViewProjectPage/>},
                        {path: "edit/:projectID", element: <ViewProjectPage/>},
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router}></RouterProvider>;
}
