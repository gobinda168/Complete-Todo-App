const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

//? Routes
//Public - Post - Register New User
router.route("/register").post(register);
//Public - Post - Login User
router.route("/login").post(login);
//Private - Get - Get All Registered Users
router.route("/users").get(auth, getCurrentUser);

module.exports = router;
