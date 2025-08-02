import mongoose from "mongoose";
import MemberCategory from "../models/memberCategory.modal.js";
import ProjectCategory from "../models/projectCategory.modal.js";
import TaskCategory from "../models/tasksCategory.modal.js";

function getUserID(req, res) {
    const userID = req.userID

    if (!userID) {
        return res.status(400).json({success: false, message: "User ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({success: false, message: "Invalid user ID"})
    }
    return userID
}

export async function getMemberCategories(req, res) {
    const userID = getUserID(req, res)
    try {
        const categories = await MemberCategory.find({userID})
        res.status(200).json({success: true, data: categories})
    } catch (err) {
        console.log("Error while getting categories: ", err);
        res.status(500).json({success: false, message: err.message || "Cannot get member categories"});
    }
}

export async function getProjectCategories(req, res) {
    const userID = getUserID(req, res)
    try {
        const categories = await ProjectCategory.find({userID})
        res.status(200).json({success: true, data: categories})
    } catch (err) {
        console.log("Error while getting categories: ", err);
        res.status(500).json({success: false, message: err.message || "Cannot get project categories"});
    }
}

export async function getTasksCategories(req, res) {
    const userID = getUserID(req, res)
    const {projectID} = req.params
    try {
        const categories = await TaskCategory.find({userID, projectID})
        res.status(200).json({success: true, data: categories})
    } catch (err) {
        console.log("Error while getting categories: ", err);
        res.status(500).json({success: false, message: err.message || "Cannot get tasks categories"});
    }
}

export async function addMemberCategory(req, res) {
    const userID = getUserID(req, res)
    const {name, color} = req.body
    if (!name || !color) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    try {
        const newCategory = new MemberCategory({userID, name, color})
        await newCategory.save()
        res.status(201).json({success: true, message: "Category created successfully", data: newCategory})
    } catch (err) {
        console.log("Error while creating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while creating category"});
    }
}

export async function addProjectCategory(req, res) {
    const userID = getUserID(req, res)
    const {name, color} = req.body
    if (!name || !color) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    try {
        const newCategory = new ProjectCategory({userID, name, color})
        await newCategory.save()
        res.status(201).json({success: true, message: "Category created successfully", data: newCategory})
    } catch (err) {
        console.log("Error while creating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while creating category"});
    }
}

export async function addTaskCategory(req, res) {
    const userID = getUserID(req, res)
    const {name, color, projectID} = req.body
    if (!name || !color) {
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    try {
        const newCategory = new TaskCategory({userID,projectID , name, color})
        await newCategory.save()
        res.status(201).json({success: true, message: "Category created successfully", data: newCategory})
    } catch (err) {
        console.log("Error while creating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while creating category"});
    }
}

export async function updateMemberCategory(req, res) {
    const categoryData = req.body
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    if (!categoryData) {
        return res.status(400).json({success: false, message: "Category data is required"})
    }
    try {
        const category = await MemberCategory.findByIdAndUpdate(categoryID, categoryData, {new: true});
        if (!category) return res.status(404).json(
            {success: false, message: "Category not found"}
        )
        res.status(200).json({success: true, message: "Category updated successfully", data: category})
    } catch (err) {
        console.log("Error while updating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while updating category"});
    }
}

export async function updateProjectCategory(req, res) {
    const categoryData = req.body
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    if (!categoryData) {
        return res.status(400).json({success: false, message: "Category data is required"})
    }
    try {
        const category = await ProjectCategory.findByIdAndUpdate(categoryID, categoryData, {new: true});
        if (!category) return res.status(404).json(
            {success: false, message: "Category not found"}
        )
        res.status(200).json({success: true, message: "Category updated successfully", data: category})
    } catch (err) {
        console.log("Error while updating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while updating category"});
    }
}

export async function updateTaskCategory(req, res) {
    const categoryData = req.body
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    if (!categoryData) {
        return res.status(400).json({success: false, message: "Category data is required"})
    }
    try {
        const category = await TaskCategory.findByIdAndUpdate(categoryID, categoryData, {new: true});
        if (!category) return res.status(404).json(
            {success: false, message: "Category not found"}
        )

        res.status(200).json({success: true, message: "Category updated successfully", data: category})
    } catch (err) {
        console.log("Error while updating category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while updating category"});
    }
}

export async function deleteMemberCategory(req, res) {
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    try {
        const category = await MemberCategory.findByIdAndDelete(categoryID);
        if (!category) return res.status(404).json(
            {success: false, message: "Category not found"}
        )

        res.status(200).json({success: true, message: "Category deleted successfully", data: category})
    } catch (err) {
        console.log("Error while deleting category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while deleting category"});
    }

}

export async function deleteProjectCategory(req, res) {
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    try {
        const category = await ProjectCategory.findByIdAndDelete(categoryID);
        if (!category) {
            return res.status(404).json(
                {success: false, message: "Category not found"}
            )
        }

        res.status(200).json({success: true, message: "Category deleted successfully", data: category})
    } catch (err) {
        console.log("Error while deleting category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while deleting category"});
    }
}

export async function deleteTaskCategory(req, res) {
    const {categoryID} = req.params
    if (!categoryID) {
        return res.status(400).json({success: false, message: "Category ID is required"})
    }
    if (!mongoose.Types.ObjectId.isValid(categoryID)) {
        return res.status(400).json({success: false, message: "Invalid category ID"})
    }
    try {
        const category = await TaskCategory.findByIdAndDelete(categoryID);
        if (!category) {
            return res.status(404).json(
                {success: false, message: "Category not found"}
            )
        }
        res.status(200).json({success: true, message: "Category deleted successfully", data: category})
    } catch (err) {
        console.log("Error while deleting category: ", err);
        res.status(500).json({success: false, message: err.message || "Error while deleting category"});
    }
}