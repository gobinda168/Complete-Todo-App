const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Token Not Found!!!" });
  try {
    const varifyToken = jwt.verify(token, config.get("jwtSecret"));
    req.user = varifyToken;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Invalid Token!!!!" });
  }
};
