import {body} from 'express-validator';

export const regUserValid = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty().withMessage("Email is required")
    .isLength({min: 6}).withMessage("password must be at least 6 characters")
];