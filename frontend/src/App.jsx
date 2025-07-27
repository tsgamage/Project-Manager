import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import ViewProjectPage, { viewProjectLoader } from "./pages/ViewProject";
import { projectsLoader } from "./pages/Home";
import AddProjectPage from "./pages/AddProject";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import VerifyCodePage from "./pages/VerifyCode";
import ResetPasswordPage from "./pages/ResetPassword";
import { ProjectContextProvider } from "./store/project.context";

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
            { path: "edit/:projectID" },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/verify-code",
      element: <VerifyCodePage />,
    },
    {
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
  ]);

  return (
    <ProjectContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ProjectContextProvider>
  );
}
