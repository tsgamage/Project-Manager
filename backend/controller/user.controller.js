import { User } from "../models/user.model.js";

export async function updateUser(req, res, next) {
  const userID = req.userID;
  const { name } = req.body;
  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = name;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    next(err);
  }
}
