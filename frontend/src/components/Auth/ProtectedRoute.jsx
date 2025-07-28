import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth.context.jsx";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user, isCheckingAuth } = useContext(AuthContext); // Assuming AuthContext provides authentication state
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      navigate("/auth/login", { replace: true });
    } else if (!isCheckingAuth && user && user.isVerified === false) {
      navigate("/auth/verify-mail", { replace: true });
    } else if (!isCheckingAuth && user && user.isVerified === true) {
      navigate("/", { replace: true });
    }
  }, [isCheckingAuth, isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  if (user.isVerified === false) {
    return null;
  }
  return children;
}
