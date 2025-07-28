import { Router } from "express";
import {
  signup,
  logout,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controller/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use(verifyToken)

router.get("/check-auth", checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
