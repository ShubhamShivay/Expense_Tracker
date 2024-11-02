import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//! @desc   User Registration
//! @route  POST /User/register
//! @access Public

export const userRegistrationCtrl = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//! @desc   User Login
//! @route  POST /User/login
//! @access Public

export const userLoginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });

  // ! Check password and login
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      data: user,
      token: generateToken({
        _id: user._id,
        isAdmin: user.isAdmin,
      }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//! @desc   Get user profile
//! @route  GET /User/profile
//! @access Private

export const userProfileCtrl = asyncHandler(async (req, res) => {
  // console.log(req.userAuthId);
  const user = await User.findById(req.userAuthId._id);
  res.status(200).json({
    status: "success",
    message: "User profile fetched successfully",
    data: user,
  });
});

//! @desc   Get all users
//! @route  GET /User
//! @access Private/Admin

export const getAllUsersCtrl = asyncHandler(async (req, res) => {
  // console.log(req.userAuthId.id);
  const users = await User.find();
  res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: users,
  });
});

//! @desc   Update user
//! @route  PUT /User/:id
//! @access Private

export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.userAuthId._id);

  if (!user) {
    throw new Error("User does not exist");
  }
  // console.log(user);
  // console.log(req.body);
  //! Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.userAuthId._id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  res.json({
    message: "User Profile Updated successfully",
    data: updatedUser,
  });
});

//! @desc   Delete user
//! @route  DELETE /User/:id
//! @access Private

export const deleteUserCtrl = asyncHandler(async (req, res) => {
  console.log("delete user");
  console.log(req.userAuthId._id);
  const user = await User.findById(req.userAuthId._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const deleteUser = await User.findByIdAndDelete(req.userAuthId._id);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    data: deleteUser,
  });
});

//! @desc   Change password
//! @route  PUT /User/password
//! @access Private

export const changePasswordCtrl = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if old password is correct
  const user = await User.findById(req.userAuthId._id).select("+password");
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Your current password is incorrect");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password
  const updatedUser = await User.findByIdAndUpdate(
    req.userAuthId._id,
    {
      $set: {
        password: hashedPassword,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
    data: updatedUser,
  });
});

//! @desc   Forgot password
//! @route  POST /User/forgot-password
//! @access Public

export const forgotPasswordCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Create reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/reset-password/${resetToken}`;

  // Send email
  const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Reset your password",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "fail",
      message: "Email could not be sent",
    });
  }
});
