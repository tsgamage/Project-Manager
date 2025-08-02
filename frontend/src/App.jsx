import { AuthContextProvider } from "./store/auth.context";
import { ProjectContextProvider } from "./store/project.context";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ViewProjectPage from "./pages/ViewProject";
import RootLayout from "./pages/Root";
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
import AllProjects from "./pages/AllProjects.jsx";
import LanndingPage from "./pages/Landing.jsx";
import HomePage from "./pages/Home.jsx";
import TeamsPage from "./pages/Team.jsx";
import TasksPage from "./pages/Tasks.jsx";
import SettingsPage from "./pages/Settings.jsx";
import TrashPage from "./pages/Trash.jsx";
import { MemberContextProvider } from "./store/member.context.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      element: (
        <RedirectUserIfAuthenticated>
          <LanndingPage />
        </RedirectUserIfAuthenticated>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute viewing="home">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [{ index: true, element: <HomePage /> }],
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
      path: "/project",
      id: "project",
      element: (
        <ProtectedRoute viewing="project">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "all", element: <AllProjects /> },
        { path: "new", element: <AddProjectPage /> },
        { path: "view/:projectID", element: <ViewProjectPage /> },
        { path: "tasks", element: <TasksPage /> },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute viewing="user">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "profile", element: <ProfilePage /> },
        { path: "settings", element: <SettingsPage /> },
        { path: "trash", element: <TrashPage /> }
      ],
    },
    {
      path: "/team",
      element: (
        <ProtectedRoute viewing="team">
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [{ path: "members", element: <TeamsPage /> }],
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
              <MemberContextProvider>
                <Toaster />
                <RouterProvider router={router}></RouterProvider>
              </MemberContextProvider>
            </ProjectContextProvider>
          </UserContextProvider>
        </PageLayoutContextProvider>
      </AuthContextProvider>
  );
}
