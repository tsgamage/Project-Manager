import Member from "../models/member.modal.js";
import mongoose from "mongoose";

export async function getAllMembers(req, res) {
    try {
        const members = await Member.find({});
        res.status(200).json({ success: true, data: members })
    } catch (err) {
        console.log("Error while getting members: ", err.message);
        res.status(500).json({ success: false, message: "err.message" });
    }
}

export async function getMemberById(req, res) {
    const { memberID } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(memberID)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" })
    }

    try {
        const member = await Member.findById(memberID);
        if (!member) {
            return res.status(404).json({ success: false, message: "Member not found" })
        }
        res.status(200).json({ success: true, data: member })
    } catch (err) {
        console.log("Error while getting member: ", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
}

export async function newMember(req, res) {
    const { name, role, email, color } = req.body;
    if (!name || !role || !email || !color) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }
    try {
        const newMember = new Member({
            name,
            role,
            email,
            color
        })
        await newMember.save();
        res.status(201).json({ success: true, message: "Member created successfully", data: newMember })
    } catch (err) {
        console.log("Error while creating member: ", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateMember(req, res) {
    const { memberID } = req.params
    const memberData = req.body;

    if (!memberID) {
        return res.status(400).json({ success: false, message: "Member ID is required" })
    }
    if (!mongoose.Types.ObjectId.isValid(memberID)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" })
    }
    if (!memberData) {
        return res.status(400).json({ success: false, message: "Member data is required" })
    }

    try {
        const member = await Member.findByIdAndUpdate(memberID, memberData, { new: true });
        res.status(200).json({ success: true, message: "Member updated successfully", data: member })
    } catch (err) {
    }
}

export async function deleteMember(req, res) {
    const { memberID } = req.params
    if (!memberID) {
        return res.status(400).json({ success: false, message: "Member ID is required" })
    }
    if (!mongoose.Types.ObjectId.isValid(memberID)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" })
    }
    try {
        const member = await Member.findByIdAndDelete(memberID);
        res.status(200).json({ success: true, message: "Member deleted successfully", data: member })
    } catch (err) {
        console.log("Error while deleting member: ", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
}