import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addMemberCategory,
  deleteMemberCategory,
  getMemberCategories,
  updateMemberCategory
} from "../controller/memberCategory.controller.js";
import {
  addTaskCategory,
  deleteTaskCategory,
  getTasksCategories,
  updateTaskCategory
} from "../controller/tasksCategory.controller.js";
import { memberCategoryValidator } from "../validators/memberCategory.validator.js";
import validateData from "../validators/index.js";
import { taskCategoryValidator } from "../validators/taskCategory.validator.js";

const router = Router();

router.use(verifyToken);

router.get("/member", getMemberCategories);
router.get("/tasks", getTasksCategories);

router.post("/member/new", memberCategoryValidator, validateData, addMemberCategory);
router.post("/tasks/new", taskCategoryValidator, validateData, addTaskCategory);

router.put("/member/:categoryID", memberCategoryValidator, validateData, updateMemberCategory);
router.put("/tasks/:categoryID", taskCategoryValidator, validateData, updateTaskCategory);

router.delete("/member/:categoryID", deleteMemberCategory);
router.delete("/tasks/:categoryID", deleteTaskCategory);

export default router;
