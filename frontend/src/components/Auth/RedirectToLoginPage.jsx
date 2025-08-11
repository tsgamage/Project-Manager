import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth.context";
import { useNavigate } from "react-router-dom";

export default function RedirectToLoginPage({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  if (user && user.isVerified) {
    return null;
  }

  return children;
}
