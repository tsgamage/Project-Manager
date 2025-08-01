import { Router } from "express";
import { deleteMember, getAllMembers, getMemberById, newMember, updateMember } from "../controller/member.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use(verifyToken)

router.get("/", getAllMembers);
router.get("/:memberID", getMemberById);
router.post("/new", newMember);
router.put("/:memberID", updateMember);
router.delete("/:memberID", deleteMember);


export default router;