import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "../mail/mails.js";

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

    const mailResponse = await sendVerificationEmail(user.email, verificationToken);

    if (!mailResponse.success) {
      return res.status(400).json({ success: false, message: mailResponse.message });
    }

    await user.save();
    generateTokenAndSetCookie(res, user._id);

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

export async function verifyEmail(req, res) {
  const { code } = req.body;
  const userID = req.userID;

  try {
    const user = await User.findOne({
      _id: userID,
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: new Date().toISOString() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    console.log("Error while verifying email:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function resendVerificationCode(req, res) {
  const userID = req.userID;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email is already verified" });
    }

    const newVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const newVerificationTokenExpiresAt = new Date(
      Date.now() + parseInt(process.env.EMAIL_VERIFICATION_CODE_EXPIRES_IN, 10)
    ).toISOString();

    user.verificationToken = newVerificationToken;
    user.verificationTokenExpiresAt = newVerificationTokenExpiresAt;
    await user.save();

    const mailResponse = await sendVerificationEmail(user.email, newVerificationToken);

    if (!mailResponse.success) {
      return res.status(400).json({ success: false, message: mailResponse.message });
    }

    res.status(200).json({ success: true, message: "Verification code resent successfully" });
  } catch (err) {
    console.log("Error while resending verification code:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // Do not reveal if the user exists or not
    if (!user) {
      return res
        .status(200)
        .json({ success: true, message: "Password reset email sent successfully" });
    }

    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetTokenExpiresIn = new Date(
      Date.now() + parseInt(process.env.FORGOT_PASSWORD_CODE_EXPIRES_IN)
    ).toISOString();

    const passwordResetLink = `${process.env.CLIENT_URL}/auth/reset-password/${passwordResetToken}`;

    const emailResponse = await sendPasswordResetEmail(user.email, passwordResetLink);

    if (!emailResponse.success) {
      return res.status(400).json({ success: false, message: emailResponse.message });
    }

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpiresAt = passwordResetTokenExpiresIn;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset email sent successfully" });
  } catch (err) {
    console.log("Error while sending forgot password email:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function resetPassword(req, res) {
  const { password } = req.body;
  const { token } = req.params;
  try {
    if (!token) {
      return res.status(400).json({ success: false, message: "Token is required" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date().toISOString() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired password reset token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.log("Error while resetting password:", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function checkAuth(req, res) {
  const userID = req.userID;

  if (!userID) {
    return res.status(401).json({ success: false, message: "Unauthorized - No user ID found" });
  }

  try {
    const user = await User.findOne({ _id: userID }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
