import { Router } from "express";
import { updateUser } from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/update", verifyToken, updateUser);

export default router;
