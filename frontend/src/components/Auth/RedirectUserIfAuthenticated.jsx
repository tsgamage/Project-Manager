import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RedirectUserIfAuthenticated({ children }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user && user.isVerified) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated && user && user.isVerified) {
    return null;
  }

  return children;
}
