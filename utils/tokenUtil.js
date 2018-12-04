const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const signToken = payload => {
  return jwt.sign(payload.toJSON(), keys.secretOrKey, { expiresIn: 3600 });
};

module.exports = {
  jwtAuth: (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  }
};
