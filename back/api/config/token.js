const jwt = require("jsonwebtoken");
const SECRET = "patovica";

const generateToken = (payload) => {
  return jwt.sign({ user: payload }, SECRET, { expiresIn: "2d" });
};

const validateToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
