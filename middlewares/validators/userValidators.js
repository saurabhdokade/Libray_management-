const { body, param } = require("express-validator");

// Validate user registration
const validateRegister = [
  body("name").isString().withMessage("Name must be a string").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validate user login
const validateLogin = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];



// Validate email check
const validateCheckEmail = [
  body("email").isEmail().withMessage("Please enter a valid email"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCheckEmail,
};
