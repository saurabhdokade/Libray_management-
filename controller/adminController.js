const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

// Admin Register with MFA Setup
exports.adminRegister = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, confirmPassword, role } = req.body;

  const validRoles = ["Admin", "user","Librarian"];
  if (!validRoles.includes(role)) {
    return next(new ErrorHander("Invalid role", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHander("User with this email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    confirmPassword,
    role,
  });

  res.status(201).json({
    success: true,
    message: 'Admin user created successfully.',
  });
});

exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter email, password, and MFA token", 400));
  }

  const user = await User.findOne({ email }).select("+password +mfaSecret");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});


  