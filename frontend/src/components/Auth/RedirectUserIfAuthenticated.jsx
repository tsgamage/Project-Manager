import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth.context";
import { useNavigate } from "react-router-dom";

export default function RedirectUserIfAuthenticated({ children }) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
    if (isAuthenticated && user && user.isVerified) {
      navigate("/", { replace: true });
    } else if (isAuthenticated && user && user.isVerified === false) {
      navigate("/auth/verify-mail", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated && user && user.isVerified) {
    return null;
  }

  return children;
}
