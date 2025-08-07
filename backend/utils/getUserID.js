import mongoose from "mongoose";

export default function getUserID(req, res) {
  const userID = req.userID;

  if (!userID) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }
  return userID;
}
