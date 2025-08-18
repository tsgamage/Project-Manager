import { validationResult } from "express-validator";

export default function validateData(req, res, next) {
  const result = validationResult(req);

  if (Object.keys(result.errors).length === 0) {
    return next();
  } else {
    const mappedErrors = {};

    result.errors.map((err) => {
      mappedErrors[err.path] = err.msg;
    });

    return res.status(400).json({ success: false, errors: mappedErrors });
  }
}
