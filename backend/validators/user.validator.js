import { check } from "express-validator";

export const updateUserValidator = [
  check("name", "Name must be at least 3 characters long").isLength({ min: 3 }),
  check("name", "Name must be at most 30 characters long").isLength({ max: 30 }),
  check("name", "Name is required").notEmpty(),
];
