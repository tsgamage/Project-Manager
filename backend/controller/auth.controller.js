import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const isEmailAlreadyExist = await User.findOne({ email });

    if (isEmailAlreadyExist) {
      return res.status(400).json({ success: false, message: "User Already Exist" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const verificationTokenExpiresAt = new Date(
      Date.now() + parseInt(process.env.EMAIL_VERIFICATION_CODE_EXPIRES_IN, 10) // 10 is passed to parseInt to saying it's a decimal number
    ).toISOString(); // 15 minutes expiration time

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    // await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    console.log("Error while signing up:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the account is verified
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date().toISOString();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    console.log("Error while logging in:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
}
