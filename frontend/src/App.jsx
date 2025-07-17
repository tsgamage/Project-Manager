import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ViewProjectPage, { viewProjectLoader } from "./pages/ViewProject";
import { projectsLoader } from "./pages/Home";
import AddProjectPage from "./pages/AddProject";
import EditProjectPage from "./pages/EditProject";

export default function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: <RootLayout />,
      loader: projectsLoader,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "project",
          id: "project",
          loader: viewProjectLoader,
          children: [
            { path: "new", element: <AddProjectPage /> },
            { path: "view/:projectID", element: <ViewProjectPage /> },
            { path: "edit/:projectID", element: <EditProjectPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
