import { Router } from "express";
import { updateUser } from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { updateUserValidator } from "../validators/user.validator.js";
import validateData from "../validators/index.js";

const router = Router();

router.use(verifyToken);

router.post("/update", updateUserValidator, validateData, updateUser);

export default router;
