const express = require("express");
const {
  createNewUser,
  Login,
  updateUser,
  getAllUsers,
  getsingleUser,
} = require("../controller/usercontroller");

const router = express.Router();

// Define routes for user operations
router.post("/register", createNewUser);   // Register a new user
router.post("/login", Login);              // Login route for user authentication
router.put("/:id", updateUser);            // Update user by ID
router.get("/", getAllUsers);              // Fetch all users
router.get("/:id", getsingleUser);         // Get a single user by ID

module.exports = router;
