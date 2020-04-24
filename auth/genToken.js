const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };
  options = {
    expiresIn: "8hr",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}
