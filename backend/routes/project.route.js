import {Router} from "express";
import {
    deleteProject,
    getAllProjects,
    getProjectById,
    newProject,
    updateProject
} from "../controller/project.controller.js";

const router = Router();

router.get("/", getAllProjects);
router.get("/:projectID", getProjectById)
router.post("/new", newProject);
router.put("/:projectID", updateProject)
router.delete("/:projectID", deleteProject)

export default router