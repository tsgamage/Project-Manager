import { Router } from "express";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  resendVerificationCode,
  changePassword,
} from "../controller/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/resend-verification", verifyToken, resendVerificationCode);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyToken, verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", verifyToken, changePassword);

export default router;
