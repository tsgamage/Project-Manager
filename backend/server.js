import express, {json} from "express";
import dotenv from "dotenv";
import {connectionDB} from "./config/db.js";
import Project from "./models/projects.model.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json())
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/api/project", async (req, res) => {
    try {
        const project = await Project.find({});
        console.log(project);
        res.status(200).json({success: true, data: project});
    } catch (e) {
        console.log("cannot get project", e.message);
        res.status(500).json({success: false, message: e.message});
    }

});

app.get("/api/project/:projectID", async (req, res) => {
    const {projectID} = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectID)) {
        return res.status(400).json({success: false, message: "Invalid projectID"});
    }

    try {
        const project = await Project.findById(projectID)

        if(!project) {
            return res.status(404).json({success: false, message: "Project not found"});
        }else{
            return res.status(200).json({success: true, data: project});
        }

    } catch (e) {
        console.log(`cannot get project: ${projectID}`, e.message);
        return res.status(500).json({success: false, message: e.message});
    }
})

app.post("/api/project/new", (req, res) => {
    const projectData = req.body;

    if (
        !projectData.title ||
        !projectData.description ||
        !projectData.startDate ||
        !projectData.endDate ||
        !projectData.status
    ) {
        return res
            .status(400)
            .json({success: false, message: "All fields are required"});
    }

    try {
        const newProject = Project(projectData)
        newProject.save()

        return res.status(201).json({
            success: true,
            message: "Created project",
            data: newProject
        })
    } catch {
        return res.status(500).json({success: false, message: "Something went wrong"});
    }

});

app.listen(PORT, "0.0.0.0", async () => {
    console.log("Server is running on port", PORT);
    await connectionDB();
});