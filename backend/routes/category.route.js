import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addMemberCategory,
  deleteMemberCategory,
  getMemberCategories,
  updateMemberCategory,
} from "../controller/memberCategory.controller.js";
import {
  addTaskCategory,
  deleteTaskCategory,
  getTasksCategories,
  updateTaskCategory,
} from "../controller/tasksCategory.controller.js";

const router = Router();

router.use(verifyToken);

router.get("/member", getMemberCategories);
router.get("/tasks", getTasksCategories);

router.post("/member/new", addMemberCategory);
router.post("/tasks/new", addTaskCategory);

router.put("/member/:categoryID", updateMemberCategory);
router.put("/tasks/:categoryID", updateTaskCategory);

router.delete("/member/:categoryID", deleteMemberCategory);
router.delete("/tasks/:categoryID", deleteTaskCategory);

export default router;
