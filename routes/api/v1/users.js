const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");

const HOMEDIR = path.join(__dirname, "..", "..", "..");

const tokenUtil = require(path.join(HOMEDIR, "utils", "tokenUtil"));
require(path.join(HOMEDIR, "config", "passport"));

const User = require(path.join(HOMEDIR, "models", "User"));
const { updateUser } = require(path.join(HOMEDIR, "utils", "queryBuilder"));

router.post(
  "/auth/google",
  passport.authenticate("googleToken", { session: false }),
  tokenUtil.googleAuth
);

router.post(
  "/update/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { displayName, location } = req.body;

    let errors = {};
    let query = {};

    if (req.user) {
      if (displayName && displayName !== req.user.displayName) {
        User.find({ displayName: req.body.displayName }).then(user => {
          if (user.length > 0) {
            errors.message = "userName is taken";
            res.json({ success: false, errors });
          } else {
            query["displayName"] = displayName;
            if (location) {
              query["location"] = location;
            }
            console.log("query", query);
            User.findOneAndUpdate({ _id: req.params.id }, query, { new: true })
              .then(updateUser => {
                res.send(updatedUser);
              })
              .catch(err => {
                errors.message = "Error updating profile";
                res.json({ success: false, errors });
              });
          }
        });
      } else if (location && req.user.location !== location) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { location: location },
          { new: true }
        )
          .then(updatedUser => {
            res.json(updatedUser);
          })
          .catch(err => {
            errors.message = "Error updating profile";
            res.json({ success: false, errors });
          });
      } else {
        errors.message = "Nothing to update";
        res.json({ success: false, errors });
      }
    }
  }
);

//@route GET /api/users/current
//@route Current user
//@route Private
router.get(
  "/current",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
