import Project from "../models/projects.model.js";
import mongoose from "mongoose";

export const getAllProjects = async (req, res, next) => {
  const userID = req.userID;
  try {
    const project = await Project.find({ userID }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  const { projectID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({ success: false, message: "Invalid projectID" });
  }

  try {
    const project = await Project.findById(projectID);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    } else {
      return res.status(200).json({ success: true, data: project });
    }
  } catch (err) {
    next(err);
  }
};

export const newProject = async (req, res, next) => {
  const userID = req.userID;
  const projectData = req.body;

  if (
    !projectData.title ||
    !projectData.description ||
    !projectData.startDate ||
    !projectData.endDate
  ) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newProject = Project({ ...projectData, userID });
    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Created project",
      data: newProject,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  const { projectID } = req.params;
  const projectData = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({ success: false, message: "Invalid projectID" });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectID, projectData, { new: true });
    return res.status(200).json({ success: true, data: updatedProject });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  const { projectID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    return res.status(400).json({ success: false, message: "Invalid projectID" });
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(projectID);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedProject,
    });
  } catch (err) {
    next(err);
  }
};
