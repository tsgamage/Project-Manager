import { Router } from "express";
import {
  deleteProject,
  getAllProjects,
  getProjectById,
  newProject,
  updateProject,
} from "../controller/project.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { newProjectValidator, updateProjectValidator } from "../validators/project.validator.js";
import validateData from "../validators/index.js";

const router = Router();

router.use(verifyToken);

router.get("/", getAllProjects);
router.get("/:projectID", getProjectById);
router.post("/new", newProjectValidator, validateData, newProject);
router.put("/:projectID", updateProjectValidator, validateData, updateProject);
router.delete("/:projectID", deleteProject);

export default router;
