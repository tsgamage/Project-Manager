import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RedirectToLoginPage({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isChekingAuth = useSelector((state) => state.auth.isChekingAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isChekingAuth && !isAuthenticated) {
      navigate("/auth/login", { replace: true });
    }
  }, [isAuthenticated, isChekingAuth, navigate]);

  if (user && user.isVerified) {
    return null;
  }

  return children;
}
