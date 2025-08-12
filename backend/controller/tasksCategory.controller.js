import mongoose from "mongoose";
import TaskCategory from "../models/tasksCategory.modal.js";
import getUserID from "../utils/getUserID.js";

export async function getTasksCategories(req, res) {
  const userID = getUserID(req, res);
  const { projectID } = req.params;

  try {
    const categories = await TaskCategory.find({ userID, projectID });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.log("Error while getting categories: ", err);
    res.status(500).json({ success: false, message: err.message || "Cannot get tasks categories" });
  }
}

export async function addTaskCategory(req, res) {
  const userID = getUserID(req, res);
  const { name, color, projectID } = req.body;

  if (!name || !color || !projectID) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newCategory = new TaskCategory({ userID, projectID, name, color });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Category created successfully", data: newCategory });
  } catch (err) {
    console.log("Error while creating category: ", err);
    res
      .status(500)
      .json({ success: false, message: err.message || "Error while creating category" });
  }
}

export async function updateTaskCategory(req, res) {
  const { name, color } = req.body;
  const { categoryID } = req.params;

  if (!categoryID) {
    return res.status(400).json({ success: false, message: "Category ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }
  if (!name || !color) {
    return res.status(400).json({ success: false, message: "Category data is required" });
  }

  try {
    const category = await TaskCategory.findByIdAndUpdate(
      categoryID,
      { name, color },
      { new: true }
    );

    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res
      .status(200)
      .json({ success: true, message: "Category updated successfully", data: category });
  } catch (err) {
    console.log("Error while updating category: ", err);
    res
      .status(500)
      .json({ success: false, message: err.message || "Error while updating category" });
  }
}

export async function deleteTaskCategory(req, res) {
  const { categoryID } = req.params;

  if (!categoryID) {
    return res.status(400).json({ success: false, message: "Category ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }

  try {
    const category = await TaskCategory.findByIdAndDelete(categoryID);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully", data: category });
  } catch (err) {
    console.log("Error while deleting category: ", err);
    res
      .status(500)
      .json({ success: false, message: err.message || "Error while deleting category" });
  }
}
