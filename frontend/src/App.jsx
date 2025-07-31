import { AuthContextProvider } from "./store/auth.context";
import { ProjectContextProvider } from "./store/project.context";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ViewProjectPage from "./pages/ViewProject";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AddProjectPage from "./pages/AddProject";
import ProfilePage from "./pages/Profile";
import AuthRoot from "./pages/auth/AuthRoot";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import VerifyCodePage from "./pages/auth/VerifyCode";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import RedirectUserIfAuthenticated from "./components/Auth/RedirectUserIfAuthenticated.jsx";
import { UserContextProvider } from "./store/user.context.jsx";
import { PageLayoutContextProvider } from "./store/pageLayout.context.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: (
        <ProtectedRoute viewing="root">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "project",
          id: "project",
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
      element: (
        <RedirectUserIfAuthenticated>
          <AuthRoot />
        </RedirectUserIfAuthenticated>
      ),
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "verify-mail", element: <VerifyCodePage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute viewing="user">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [{ path: "profile", element: <ProfilePage /> }],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <AuthContextProvider>
      <PageLayoutContextProvider>
        <UserContextProvider>
          <ProjectContextProvider>
            <Toaster />
            <RouterProvider router={router}></RouterProvider>
          </ProjectContextProvider>
        </UserContextProvider>
      </PageLayoutContextProvider>
    </AuthContextProvider>
  );
}
