// adminRoutes.js
const express = require("express");//
const router = express.Router();
const { adminLogin, adminRegister } = require("../controller/adminController");
const { validateAdminRegister, validateAdminLogin } = require("../utils/adminValidation");
// Admin Login route
router.route("/admin/register").post(validateAdminRegister,adminRegister)
router.route("/admin/login").post(validateAdminLogin, adminLogin);
module.exports = router;
