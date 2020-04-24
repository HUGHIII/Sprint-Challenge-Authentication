const jwt = require("jsonwebtoken");
const secret = require("./secret");

module.exports = {
  generateToken,
};

function generateToken(user) {
  if (
    !user ||
    typeof user.id === "undefined" ||
    typeof user.username === "undefined"
  ) {
    new error("username and id needed");
  }
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
