import { check } from "express-validator";

export const newMemberDataValidator = [
  check("name", "Name must be at least 3 characters long").isLength({ min: 3 }),
  check("name", "Name must be at most 30 characters long").isLength({ max: 30 }),
  check("name", "Name is required").notEmpty(),
  check("email", "Email is not valid").normalizeEmail(),
  check("email", "Email is required").isEmail(),
  check("role", "Role must be at least 3 characters long").isLength({ min: 3 }),
  check("role", "Role must be at most 30 characters long").isLength({ max: 30 }),
  check("role", "Role is required").notEmpty(),
  check("color", "Color is required").notEmpty(),
  check("categoryID", "Category is required").notEmpty(),
];

export const updateMemberDataValidator = [
  check("name", "Name must be at least 3 characters long").isLength({ min: 3 }).optional(),
  check("name", "Name must be at most 30 characters long").isLength({ max: 30 }).optional(),
  check("name", "Name is required").notEmpty().optional(),
  check("email", "Email is not valid").normalizeEmail().optional(),
  check("email", "Email is required").isEmail().optional(),
  check("role", "Role must be at least 3 characters long").isLength({ min: 3 }).optional(),
  check("role", "Role must be at most 30 characters long").isLength({ max: 30 }).optional(),
  check("role", "Role is required").notEmpty().optional(),
  check("color", "Color is required").notEmpty().optional(),
  check("categoryID", "Category is required").notEmpty().optional(),
];
