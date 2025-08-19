import { check } from "express-validator";

export const newProjectValidator = [
  check("title", "Title must be at least 3 characters long").isLength({ min: 3 }),
  check("title", "Title must be at most 100 characters long").isLength({ max: 100 }),
  check("title", "Title is required").notEmpty(),
  check("description", "Description must be at least 10 characters long").isLength({ min: 10 }),
  check("description", "Description must be at most 1000 characters long").isLength({ max: 1000 }),
  check("description", "Description is required").notEmpty(),
  check("startDate", "Start date is required").notEmpty(),
  check("endDate", "End date is required").notEmpty(),
];

export const updateProjectValidator = [
  check("title", "Title must be at least 3 characters long").isLength({ min: 3 }).optional(),
  check("title", "Title must be at most 100 characters long").isLength({ max: 100 }).optional(),
  check("title", "Title is required").notEmpty().optional(),
  check("description", "Description must be at least 10 characters long")
    .isLength({ min: 10 })
    .optional(),
  check("description", "Description must be at most 1000 characters long")
    .isLength({ max: 1000 })
    .optional(),
  check("description", "Description is required").notEmpty().optional(),
  check("startDate", "Start date is required").notEmpty().optional(),
  check("endDate", "End date is required").notEmpty().optional(),
];
