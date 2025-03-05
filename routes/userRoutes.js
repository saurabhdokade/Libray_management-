const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserDetails,
  deleteUser,
  logout
} = require("../controller/userController");

const { isAuthenticatedUser } = require("../middlewares/auth");

// Import validation functions
const { validateRegister,validateLogin,  } = require("../middlewares/validators/userValidators");
const { handleValidationErrors } = require("../middlewares/validators/validationHandler");
const { authorizeRoles } = require("../middlewares/auth");

const router = express.Router();
router.route("/signup").post(validateRegister,registerUser);
router.route("/login").post( validateLogin, handleValidationErrors, loginUser);
router.route("/logout").get(logout)
router.route("/users/:id").put(isAuthenticatedUser,authorizeRoles("Admin"), updateUserDetails) 
router.route("/users/:id").delete(isAuthenticatedUser, authorizeRoles("Admin"),deleteUser); 

module.exports = router;