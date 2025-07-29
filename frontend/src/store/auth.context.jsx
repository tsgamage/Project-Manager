import { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  user: {
    _id: "",
    name: "",
    email: "",
  },
  isAuthenticated: false,
  isCheckingAuth: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  verifyEmail: () => {},
  checkAuthStatus: () => {},
  resendVerificationCode: () => {},
  forgotPassword: () => {},
});

const API_URL = "http://localhost:3000/api/auth";

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isCheckingAuth, setIsCheckingAuth] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  async function handleLogin({ email, password }) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Login failed" };
      }

      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (err) {
      return { error: err.message || "Login failed" };
    }
  }
  async function handleSignup({ email, password, name }) {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || "Signup failed" };
      }

      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (err) {
      return { error: err.message || "Signup failed" };
    }
  }

  async function verifyEmail(code) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.status === 401) {
        checkAuthStatus();
      }

      if (!response.ok) {
        return { success: false, message: data.message || "Verification failed" };
      } else {
        return { success: true, message: data.message || "Email verified successfully" };
      }
    } catch (err) {
      return { success: false, message: err.message || "Verification failed" };
    }
  }

  async function resendVerificationCode() {
    try {
      const response = await fetch(`${API_URL}/resend-verification`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 401) {
        checkAuthStatus();
      }

      if (!response.ok) {
        return { success: false, message: data.message || "Resend failed" };
      } else {
        return { success: true, message: data.message || "Verification code resent successfully" };
      }
    } catch (err) {
      return { success: false, message: err.message || "Resend failed" };
    }
  }

  async function forgotPassword(email) {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 401) {
        checkAuthStatus();
      }

      if (!response.ok) {
        return { success: false, message: data.message || "Forgot password failed" };
      } else {
        return { success: true, message: data.message || "Password reset link sent to your email" };
      }
    } catch (err) {
      return { success: false, message: err.message || "Forgot password failed" };
    }
  }

  async function checkAuthStatus() {
    setIsCheckingAuth(true);
    console.log("Checking authentication status...");
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log("Auth status response:", data);

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Failed to check auth status:", err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const authCtxValue = {
    user,
    isAuthenticated,
    isCheckingAuth,
    login: handleLogin,
    signup: handleSignup,
    verifyEmail,
    checkAuthStatus,
    resendVerificationCode,
    forgotPassword,
  };
  return <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>;
}

export default AuthContext;
