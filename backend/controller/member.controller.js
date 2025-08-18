import Member from "../models/member.modal.js";
import mongoose from "mongoose";

function getUserID(req, res) {
  const userID = req.userID;

  if (!userID) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }
  return userID;
}

export async function getAllMembers(req, res, next) {
  const userID = getUserID(req, res);
  try {
    const members = await Member.find({ userID });
    res.status(200).json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
}

export async function getMemberById(req, res, next) {
  const { memberID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(memberID)) {
    return res.status(400).json({ success: false, message: "Invalid member ID" });
  }

  try {
    const member = await Member.findById(memberID);
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }
    res.status(200).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
}

export async function newMember(req, res, next) {
  const userID = getUserID(req, res);
  const { name, role, email, color, categoryID } = req.body;
  if (!name || !role || !email || !color || !categoryID) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    const newMember = new Member({
      userID,
      name,
      role,
      email,
      color,
      categoryID,
    });
    await newMember.save();
    res
      .status(201)
      .json({ success: true, message: "Member created successfully", data: newMember });
  } catch (err) {
    next(err);
  }
}

export async function updateMember(req, res, next) {
  const { memberID } = req.params;
  const memberData = req.body;

  if (!memberID) {
    return res.status(400).json({ success: false, message: "Member ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(memberID)) {
    return res.status(400).json({ success: false, message: "Invalid member ID" });
  }
  if (!memberData) {
    return res.status(400).json({ success: false, message: "Member data is required" });
  }

  try {
    const member = await Member.findByIdAndUpdate(memberID, memberData, { new: true });
    res.status(200).json({ success: true, message: "Member updated successfully", data: member });
  } catch (err) {
    next(err);
  }
}

export async function deleteMember(req, res, next) {
  const { memberID } = req.params;
  if (!memberID) {
    return res.status(400).json({ success: false, message: "Member ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(memberID)) {
    return res.status(400).json({ success: false, message: "Invalid member ID" });
  }
  try {
    const member = await Member.findByIdAndDelete(memberID);
    res.status(200).json({ success: true, message: "Member deleted successfully", data: member });
  } catch (err) {
    next(err);
  }
}
