import { Router } from "express";
import {
  deleteProject,
  getAllProjects,
  getProjectById,
  newProject,
  updateProject,
} from "../controller/project.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.use(verifyToken);

router.get("/", getAllProjects);
router.get("/:projectID", getProjectById);
router.post("/new", newProject);
router.put("/:projectID", updateProject);
router.delete("/:projectID", deleteProject);

export default router;
