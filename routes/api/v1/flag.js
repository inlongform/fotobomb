const express = require("express");
const passport = require("passport");
const router = express.Router();
const path = require("path");
const HOMEDIR = path.join(__dirname, "..", "..", "..");

const Post = require(path.join(HOMEDIR, "models", "Post"));
const Flag = require(path.join(HOMEDIR, "models", "Flag"));
const isEmpty = require(path.join(HOMEDIR, "validation", "is-empty"));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Flag.find()
      .populate("post_id")
      .then(flagged => {
        res.json(flagged);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/v1/posts/flag/:id
// @desc    flag post
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // res.json(post);
        Flag.find({ user: req.user.id, post_id: req.params.id })
          .then(flaggedItem => {
            if (isEmpty(flaggedItem)) {
              const newFlag = new Flag({
                user: req.user.id,
                post_id: post,
                reason: req.body.reason
              });

              newFlag
                .save()
                .then(flagged => res.json(flagged))
                .catch(err => {
                  res.status(404).json({ msg: "error saving" });
                });
            } else {
              res.status(404).json({ msg: "user has already flagged post" });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => res.status(404).json({ msg: "post not found" }));
  }
);

module.exports = router;
