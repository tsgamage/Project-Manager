import { check } from "express-validator";

export const signupValidator = [
  check("email", "Email is required").isEmail(),
  check("email", "Email is not valid").normalizeEmail(),
  check("password", "Password required").notEmpty(),
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  check("name", "Name is required").notEmpty(),
  check("name", "Name must be at least 3 characters long").isLength({ min: 3 }),
  check("name", "Name must be at most 50 characters long").isLength({ max: 30 })
];

export const loginValidator = [
  check("email", "Email is required").isEmail(),
  check("email", "Email is not valid").normalizeEmail(),
  check("password", "Password is required").notEmpty()
];

export const verifyEmailValidator = [
  check("code", "Verification code is required").notEmpty(),
  check("code", "Verification code is not valid").isLength({ min: 6, max: 6 })
];

export const forgotPasswordValidator = [
  check("email", "Email is required").isEmail(),
  check("email", "Email is not valid").normalizeEmail()
];

export const resetPasswordValidator = [
  check("password", "Password is required").notEmpty(),
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 })
];

export const changePasswordValidator = [
  check("oldPassword", "Current password is required").notEmpty(),
  check("newPassword", "New password is required").notEmpty(),
  check("newPassword", "New password must be at least 6 characters long").isLength({ min: 6 })
];