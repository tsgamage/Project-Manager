import Member from "../models/member.modal.js";
import MemberCategory from "../models/memberCategory.modal.js";
import getUserID from "../utils/getUserID.js";

export async function getMemberCategories(req, res) {
  const userID = getUserID(req, res);
  try {
    const categories = await MemberCategory.find({ userID });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    console.log("Error while getting categories: ", err);
    res
      .status(500)
      .json({ success: false, message: err.message || "Cannot get member categories" });
  }
}

export async function addMemberCategory(req, res) {
  const userID = getUserID(req, res);
  const { name, color } = req.body;
  if (!name || !color) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    const newCategory = new MemberCategory({ userID, name, color });
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

export async function updateMemberCategory(req, res) {
  const { name, color } = req.body;
  const { categoryID } = req.params;

  if (!categoryID) {
    return res.status(400).json({ success: false, message: "Category ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }
  if (!categoryID || !name || !color) {
    return res.status(400).json({ success: false, message: "Category data is required" });
  }

  try {
    const category = await MemberCategory.findByIdAndUpdate(categoryID, { name, color });
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

export async function deleteMemberCategory(req, res) {
  const { categoryID } = req.params;
  if (!categoryID) {
    return res.status(400).json({ success: false, message: "Category ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(categoryID)) {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }
  try {
    const members = await Member.find({ categoryID });

    if (members.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category. Category is assigned to members",
      });
    }
    const category = await MemberCategory.findByIdAndDelete(categoryID);

    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

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
