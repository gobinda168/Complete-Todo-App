const {
  registerValidation,
  loginValidation
} = require("../validations/authValidation");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//!Generate token function
const generateToken = (payload, vendor = "GDX") => {
  return jwt.sign(
    {
      iss: vendor,
      sub: payload,
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    config.get("jwtSecret")
  );
};

module.exports = {
  //!Register Controller
  register: async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const { name, email, password } = req.body;
    try {
      let newUser = await User.findOne({ email });
      if (newUser) return res.status(400).json({ msg: "User Already exist!!" });
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      newUser = new User({ name, email, password: hashPass });
      await newUser.save();
      const token = generateToken(newUser._id);
      res.json(token);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  },

  //!Login controller
  login: async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ msg: "User Doesn't exist" });
      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass)
        return res.status(401).json({ msg: "Invalid Username or Password" });

      const token = generateToken(user._id);
      res.json(token);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  },

  //! Protected Route get current user data
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.find({ _id: req.user.sub }).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
};
