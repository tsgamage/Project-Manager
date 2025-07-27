import { AuthContextProvider } from "./store/auth.context";
import { ProjectContextProvider } from "./store/project.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { projectsLoader } from "./pages/Home";
import ViewProjectPage, { viewProjectLoader } from "./pages/ViewProject";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AddProjectPage from "./pages/AddProject";
import AuthRoot from "./pages/auth/AuthRoot";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import VerifyCodePage from "./pages/auth/VerifyCode";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import { Toaster } from "react-hot-toast";

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
      path: "/auth",
      element: <AuthRoot />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "verify-mail", element: <VerifyCodePage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <ProjectContextProvider>
        <Toaster />
        <RouterProvider router={router}></RouterProvider>
      </ProjectContextProvider>
    </AuthContextProvider>
  );
}
