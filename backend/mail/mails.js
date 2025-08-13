import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { SENDER, transporter } from "./nodemailer.js";

function isValidEmail(email) {
  let error = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error = "Invalid email format";
  } else if (!email.toLowerCase().endsWith("@gmail.com")) {
    error = "Only Google (gmail.com) emails are accepted";
  }

  return error;
}

export async function sendVerificationEmail(email, verificationCode) {
  const errors = isValidEmail(email);
  if (errors) {
    return { success: false, message: errors };
  }

  try {
    const info = await transporter.sendMail({
      from: SENDER,
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (err) {
    console.log("Error while sending verification email:", err);
    return { success: false, message: err.message };
  }
}

export async function sendPasswordResetEmail(email, passwordResetLink) {
  const errors = isValidEmail(email);
  if (errors) {
    return { success: false, message: errors };
  }

  try {
    const info = await transporter.sendMail({
      from: SENDER,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", passwordResetLink),
    });
    return { success: true, message: "Password reset email sent successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export async function sendPasswordChangeSuccessEmail(email) {
  const errors = isValidEmail(email);
  if (errors) {
    return { success: false, message: errors };
  }
  try {
    const info = await transporter.sendMail({
      from: SENDER,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
}
