import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isChekingAuth = useSelector((state) => state.auth.isChekingAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isChekingAuth && !isAuthenticated) {
      navigate("/auth/login", { replace: true });
    } else if (!isChekingAuth && user && !user.isVerified) {
      navigate("/auth/verify-mail", { replace: true });
    }
  }, [isAuthenticated, navigate, user, isChekingAuth]);

  if (!isAuthenticated) {
    return null;
  }
  if (user.isVerified === false) {
    return null;
  }
  return children;
}
