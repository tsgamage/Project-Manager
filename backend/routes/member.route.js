import { Router } from "express";
import {
  deleteMember,
  getAllMembers,
  getMemberById,
  newMember,
  updateMember,
} from "../controller/member.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import {
  newMemberDataValidator,
  updateMemberDataValidator,
} from "../validators/member.validator.js";
import validateData from "../validators/index.js";

const router = Router();

router.use(verifyToken);

router.get("/", getAllMembers);
router.get("/:memberID", getMemberById);
router.post("/new", newMemberDataValidator, validateData, newMember);
router.put("/:memberID", updateMemberDataValidator, validateData, updateMember);
router.delete("/:memberID", deleteMember);

export default router;
