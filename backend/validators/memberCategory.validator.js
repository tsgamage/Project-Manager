import { check } from "express-validator";

export const memberCategoryValidator = [
  check("name", "Name must be at least 2 characters long").isLength({ min: 2 }),
  check("name", "Name must be at most 30 characters long").isLength({ max: 30 }),
  check("name", "Name is required").notEmpty(),
  check("color", "Color is required").notEmpty(),
];
