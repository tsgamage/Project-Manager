import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
