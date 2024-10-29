const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const user = require("../model/user");

const Login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await user.findOne({ username });
    if (!loginUser) {
      res.status(709).json({
        message: "No User Found",
      });
    }
    const passwordmatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordmatch) {
      res.status(600).json({
        message: "wrong password",
      });
    }
    res.status(200).json({
      message: "login successful",
    });
  } catch (error) {
    res.status(401).json({
      message: "unable to login",
      error,
    });
  }
});
const createNewUser = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    // Check if the user already exists
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(506).json({
        message: "User already exists",
      });
    }
    // Create a new user
    const newUser = await user.create({
      name,
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: "Signup successful",
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error,
    });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params; //WHERE to pass ur parameter and request.body
  const { name, username, phone, email, website, address, company } = req.body;
  try {
    const updateData = await user.findById(id);
    if (!updateData) {
      res.status(701).json({
        message: "user not found",
        updateData,
      });
    }
    updateData.name = name || updateData.name;
    updateData.username = username || updateData.username;
    updateData.phone = phone || updateData.phone;
    updateData.email = email || updateData.email;
    updateData.website = website || updateData.website;
    updateData.address = address || updateData.address;
    updateData.phone = phone || updateData.phone;
    updateData.company = company || updateData.company;
    await updateData.save();
    res.status(200).json({
      message: "update successful",
      updateData,
    });
  } catch (error) {
    res.status(401).json({
      massage: "error in update",
      error,
    });
  }
});
const updateUserpassword = asyncHandler(async (req, res) => {
  const { password } = req.params; //WHERE to pass ur parameter and request.body
  const { name, username, phone, email, website, address, company } = req.body;
  try {
    const updateData = await user.findById(id);
    if (!updateData) {
      res.status(701).json({
        message: "user not found",
        updateData,
      });
    }
    updateData.name = name || updateData.name;
    updateData.username = username || updateData.username;
    updateData.phone = phone || updateData.phone;
    updateData.email = email || updateData.email;
    updateData.website = website || updateData.website;
    updateData.address = address || updateData.address;
    updateData.phone = phone || updateData.phone;
    updateData.company = company || updateData.company;
    await updateData.save();
    res.status(200).json({
      message: "update successful",
      updateData,
    });
  } catch (error) {
    res.status(401).json({
      massage: "error in update",
      error,
    });
  }
});
const getAllUsers = asyncHandler(async (req, res) => {
  const getcontents = await user.find().sort({ createdAt: -1 });
  res.status(200).json(getcontents);
});
const getsingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const debby = await user.findById(id);
    if (!debby) {
      res.status(600).json({
        message: "content not found",
      });
    }
    res.status(200).json({
      message: "successful",
      debby,
    });
  } catch (error) {
    res.status(401).json({
      message: "error",
      error,
    });
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteContent = await user.findByIdAndDelete(id);
    if (!deleteContent) {
      res.status(965).json({
        message: "request unsuccesful",
      });
    }
    res.status(300).json({
      message: "delete successful",
      deleteContent,
    });
  } catch (error) {
    res.status(405).json({
      message: "error",
      error,
    });
  }
});

module.exports = {
  Login,
  createNewUser,
  updateUser,
  getAllUsers,
  getsingleUser,
  deleteUser,
};
