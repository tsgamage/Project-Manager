import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addProjectCategory,
  addTaskCategory,
  deleteProjectCategory,
  deleteTaskCategory,
  getProjectCategories,
  getTasksCategories,
  updateProjectCategory,
  updateTaskCategory,
} from "../controller/category.controller.js";

import {
  addMemberCategory,
  deleteMemberCategory,
  getMemberCategories,
  updateMemberCategory,
} from "../controller/memberCategory.controller.js";

const router = Router();

router.use(verifyToken);

router.get("/member", getMemberCategories);
router.get("/project", getProjectCategories);
router.get("/tasks/:projectID", getTasksCategories);

router.post("/member/new", addMemberCategory);
router.post("/project/new", addProjectCategory);
router.post("/tasks/new", addTaskCategory);

router.put("/member/:categoryID", updateMemberCategory);
router.put("/project/:categoryID", updateProjectCategory);
router.put("/tasks/:categoryID", updateTaskCategory);

router.delete("/member/:categoryID", deleteMemberCategory);
router.delete("/project/:categoryID", deleteProjectCategory);
router.delete("/tasks/:categoryID", deleteTaskCategory);

export default router;
