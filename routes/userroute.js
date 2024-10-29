const express = require("express");
const {
  createNewUser,
  Login,
  updateUser,
  getAllUsers,
  getsingleUser,
} = require("../controller/usercontroller");

const router = express.Router();
// router.get("/", getAllContents);
// router.get("/:id", getsingleContent);
router.post("/", createNewUser);
router.post("/login", Login);
router.put("/:id", updateUser);
router.get("/get", getAllUsers);
router.get("/:id", getsingleUser);
// router.put("/:id", updatecontent);
// router.delete("/:id", deleteContent);
module.exports = router;
