const userModel = require("../models/User");
const rulesModel = require("../models/Rules");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { customAlphabet } = require("nanoid");
const { role } = require("../constants");
const restaurantModel = require("../models/Restaurant");

// Register and onboard merged together
const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  //Check for the required fields - email sign up
  if (!email || !firstName || !lastName || !password) {
    res.status(400);
    throw new Error("Please fill in all fields (email, first name, last name, password)");
  }
  //Check if email already exists  
  const isExist = await userModel.findOne({ email });
    if (isExist) {
      res.status(400);
      throw new Error("Email already exists. Please try a different email address.");
    }
  // No password hashing, since no libraries are allowed
  const user = await userModel.create({
    email,
    firstName,
    lastName,
    password,
    role: role.USER,
  });
   // We can send a verification email here if it is needed.
  // ... (email sending logic)
  res.status(200).json({
    success: true,
    message: "User Registered Successfully!",
    user,
  });
});



const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    res.status(400);
    throw new Error("User Id is required");
  }
  const user = await userModel.findById(userId);
  if (user) {
    res.status(200).json({
      success: true,
      message: "User retrieved Successfully",
      user,
    });
  } else {
    res.status(500);
    throw new Error("User doesn't exist");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Email does not exist");
  }
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT,
      { expiresIn: "1day" }
    );
    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", token, user });
  }
  res.status(400);
  throw new Error("Password is incorrect");
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    await userModel.updateOne(
      { _id: userId },
      { password: bcrypt.hash(newPassword, 10) }
    );
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  }
  res.status(404);
  throw new Error("Old password is incorrect");
});

module.exports = {
  registerUser,
  onboardUser,
  verifyOtp,
  loginUser,
  sendVerificationCode,
  updatePassword,
  updateUserImage,
  getMe,
};
