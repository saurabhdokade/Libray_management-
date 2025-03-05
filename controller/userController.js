const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");

// Register User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword, phone } = req.body;

  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({
      message: "Invalid phone number format. Please include a valid country code."
    });
  }

  let user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "User already exists with this email." });
  }

  user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    phone,
    status: "active",
    registrationDate: Date.now(),
  });
  
  res.status(201).json({
    user,
    message: "User registered successfully."
  });
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});
exports.logout = catchAsyncErrors(async(req,res,next)=>{
  res.cookie("token",null,{
     expires:new Date(Date.now()),
     httpOnly:true,
  });

  res.status(200).json({
     success:true,
     message:"Logged Out",
  });
});
// -------------------------- Update User Details (Admin Only) --------------------------
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
    const { role, status, name, email, phone } = req.body;

    const validRoles = ["Admin", "Librarian", "user"];
    if (role && !validRoles.includes(role)) {
        return next(new ErrorHander("Invalid role", 400));
    }

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }
    if (role) user.role = role;
    if (status) user.status = status;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
        success: true,
        message: "User details updated successfully!",
        user,
    });
});

// -------------------------- Delete User (Admin Only) --------------------------
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully!",
    });
});