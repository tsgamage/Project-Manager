import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ViewProjectPage from "./pages/ViewProject";
import { loader as projectsLoader } from "./pages/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: projectsLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "project",
          children: [
            { path: "new", element: <p>Helloooooo</p> },
            { path: "view/:projectID", element: <ViewProjectPage /> },
            { path: "edit/:projectID", element: <ViewProjectPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
