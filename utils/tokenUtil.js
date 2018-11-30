const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const signToken = payload => {
  console.log(payload);
  console.log("-------------");
  return jwt.sign(payload.toJSON(), keys.secretOrKey, { expiresIn: 3600 });
};

module.exports = {
  googleAuth: (req, res, next) => {
    console.log(req.user);

    const token = signToken(req.user);
    res.status(200).json({ token });
  }
};
