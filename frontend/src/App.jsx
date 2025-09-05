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
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import RedirectUserIfAuthenticated from "./components/Auth/RedirectUserIfAuthenticated.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import LanndingPage from "./pages/Landing.jsx";
import HomePage from "./pages/Home.jsx";
import TeamsPage from "./pages/Team.jsx";
import TasksPage from "./pages/Tasks.jsx";
import SettingsPage from "./pages/Settings.jsx";
import RedirectToLoginPage from "./components/Auth/RedirectToLoginPage.jsx";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthStatusThunk } from "./store/auth.actions.js";
import { fetchMemberCategoriesThunk, fetchMembersThunk } from "./store/member.action.js";
import {
  fetchProjectByIdThunk,
  fetchProjectsThunk,
  fetchTaskCategoryThunk,
} from "./store/project.action.js";
import { uiActions } from "./store/ui.slice.js";

export default function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const selectedProjectID = useSelector((state) => state.project.selectedProjectID);

  // Checking auth status when reloading the page
  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(checkAuthStatusThunk());
    };
    checkAuth();
  }, [dispatch]);

  // Fetching all data if user authenticated
  useEffect(() => {
    const fetch = async () => {
      await Promise.all([
        dispatch(fetchMembersThunk()),
        dispatch(fetchMemberCategoriesThunk()),
        dispatch(fetchProjectsThunk()),
        dispatch(fetchTaskCategoryThunk()),
      ]);
    };
    if (isAuthenticated) {
      fetch();
    }
  }, [dispatch, isAuthenticated]);

  // Fetching project Data when user clicks on a project
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchProjectByIdThunk());
    };
    if (isAuthenticated && selectedProjectID !== 0) {
      fetch();
    }
  }, [dispatch, selectedProjectID, isAuthenticated]);

  // Handeling the side bar when user resizing the page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        dispatch(uiActions.setMobileSideBarOpen(false));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

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
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
