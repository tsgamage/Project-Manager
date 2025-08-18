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
import {
  changePasswordValidator,
  forgotPasswordValidator,
  loginValidator,
  resetPasswordValidator,
  signupValidator,
  verifyEmailValidator,
} from "../validators/auth.validator.js";
import validateData from "../validators/index.js";

const router = Router();

router.get("/check-auth", verifyToken, checkAuth);
router.get("/resend-verification", verifyToken, resendVerificationCode);

router.post("/signup", signupValidator, validateData, signup);
router.post("/login", loginValidator, validateData, login);
router.post("/logout", logout);

router.post("/verify-email", verifyToken, verifyEmailValidator, validateData, verifyEmail);
router.post("/forgot-password", forgotPasswordValidator, validateData, forgotPassword);
router.post("/reset-password/:token", resetPasswordValidator, validateData, resetPassword);
router.post("/change-password", verifyToken, changePasswordValidator, validateData, changePassword);

export default router;
