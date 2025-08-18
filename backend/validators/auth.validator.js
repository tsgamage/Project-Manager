import { check } from "express-validator";

export const signupValidator = [
  check("email", "Email is not valid").normalizeEmail(),
  check("email", "Email is required").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  check("password", "Password required").notEmpty(),
  check("name", "Name must be at least 3 characters long").isLength({ min: 3 }),
  check("name", "Name must be at most 30 characters long").isLength({ max: 30 }),
  check("name", "Name is required").notEmpty(),
];

export const loginValidator = [
  check("email", "Email is not valid").normalizeEmail(),
  check("email", "Email is required").isEmail(),
  check("password", "Password is required").notEmpty(),
];

export const verifyEmailValidator = [
  check("code", "Verification code is not valid").isLength({ min: 6, max: 6 }),
  check("code", "Verification code is required").notEmpty(),
];

export const forgotPasswordValidator = [
  check("email", "Email is not valid").normalizeEmail(),
  check("email", "Email is required").isEmail(),
];

export const resetPasswordValidator = [
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  check("password", "Password is required").notEmpty(),
];

export const changePasswordValidator = [
  check("newPassword", "New password must be at least 6 characters long").isLength({ min: 6 }),
  check("newPassword", "New password is required").notEmpty(),
  check("oldPassword", "Current password is required").notEmpty(),
];
