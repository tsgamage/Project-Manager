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
import { PageLayoutContextProvider } from "./store/pageLayout.context.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import LanndingPage from "./pages/Landing.jsx";
import HomePage from "./pages/Home.jsx";
import TeamsPage from "./pages/Team.jsx";
import TasksPage from "./pages/Tasks.jsx";
import SettingsPage from "./pages/Settings.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatusThunk } from "./store/auth.actions.js";
import RedirectToLoginPage from "./components/Auth/RedirectToLoginPage.jsx";
import { fetchMemberCategoriesThunk, fetchMembersThunk } from "./store/member.action.js";
import {
  fetchProjectByIdThunk,
  fetchProjectsThunk,
  fetchTaskCategoryThunk,
} from "./store/project.action.js";

export default function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const selectedProjectID = useSelector((state) => state.project.selectedProjectID);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await dispatch(checkAuthStatusThunk());
      if (!response.success) {
        console.log(response.message);
      }
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchMembersThunk());
      await dispatch(fetchMemberCategoriesThunk());
      await dispatch(fetchProjectsThunk());
      await dispatch(fetchTaskCategoryThunk());
    };

    if (isAuthenticated) {
      fetch();
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchProjectByIdThunk());
    };
    if (selectedProjectID !== 0) {
      fetch();
    }
  }, [dispatch, selectedProjectID]);

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
        <ProtectedRoute>
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
        {
          path: "verify-mail",
          element: (
            <RedirectToLoginPage>
              <VerifyCodePage />
            </RedirectToLoginPage>
          ),
        },
        { path: "reset-password/:token", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/project",
      id: "project",
      element: (
        <ProtectedRoute>
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
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "profile", element: <ProfilePage /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
    {
      path: "/team",
      element: (
        <ProtectedRoute>
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
    <PageLayoutContextProvider>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </PageLayoutContextProvider>
  );
}
