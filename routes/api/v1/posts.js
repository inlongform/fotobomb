const express = require("express");
const passport = require("passport");
const path = require("path");
const uuidv4 = require("uuid/v4");
const router = express.Router();
const jimp = require("jimp");

const HOMEDIR = path.join(__dirname, "..", "..", "..");

const Post = require(path.join(HOMEDIR, "models", "Post"));

const queryBuilder = require(path.join(HOMEDIR, "utils", "queryBuilder"));
const writeImage = require(path.join(HOMEDIR, "utils", "writeImage"));
const keys = require(path.join(HOMEDIR, "config", "keys"));

const getPageData = require(path.join(HOMEDIR, "utils", "middleware"));

require(path.join(HOMEDIR, "config", "passport"));

const imagePath = path.resolve(
  path.dirname(require.main.filename),
  "client/public/images/posts/full"
);

const thumbPath = path.resolve(
  path.dirname(require.main.filename),
  "client/public/images/posts/thumb"
);

const {
  ALL_POSTS,
  POSTS_BY_USER,
  POSTS_BY_TAG,
  POSTS_BY_DETAILS
} = require(path.join(HOMEDIR, "utils", "constants"));

//list
//
// get("api/posts/") //get recent posts
// get("api/posts/:id") //get single post by id
// get("api/posts/user/:id") //gets posts by user id
// get("api/posts/tag/:tag") //gets posts by tag
// get("api/posts/details/query") //get posts by details
// post("api/posts") // create post
// delete("api/posts/:id") //delete post by id

router.get("/redirect/:shortId", (req, res) => {
  let error = { success: false };
  Post.findOne({ shortId: req.params.shortId })
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        error.message = "Can not find url";
        res.json(error);
      }
      console.log(post);
    })
    .catch(err => {
      error.message = "Error finding post";
      res.json(error);
    });
});

// @route   GET api/v1/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  let error = { success: false };

  Post.findById(req.params.id)
    .populate("user", ["displayName", "avatar"])
    .then(post => {
      console.log(post);
      res.json(post);
    })
    .catch(err => {
      error.message = "No Post Found";
      res.status(404).json(error);
    });
});

// @route   GET api/v1/posts
// @desc    Get posts
// @access  Public

router.get("/", getPageData(ALL_POSTS), (req, res) => {
  let error = { success: false };
  const {
    currentPage,
    paginateCount,
    count,
    skipAmt,
    totalPages
  } = req.pageData;

  Post.find()
    .limit(paginateCount)
    .sort({ date: -1 })
    .skip(skipAmt)
    .populate("user", ["displayName", "avatar"])
    .then(posts => {
      res.json({ count, totalPages, currentPage, paginateCount, items: posts });
    })
    .catch(err => {
      error.message = "Error Retrieving Posts";
      res.status(404).json(error);
    });
});

// @route   GET api/v1/posts/user/:id
// @desc    Get posts by user id
// @access  Public
router.get("/user/:id", getPageData(POSTS_BY_USER), (req, res) => {
  let error = { success: false };

  const {
    currentPage,
    paginateCount,
    count,
    skipAmt,
    totalPages
  } = req.pageData;

  Post.find({ user: req.params.id })
    .limit(paginateCount)
    .sort({ date: -1 })
    .skip(skipAmt)
    .populate("user", ["displayName", "avatar"])
    .then(posts => {
      res.json({ count, totalPages, currentPage, paginateCount, items: posts });
    })
    .catch(err => {
      error.message = "Error Retrieving Posts";
      res.status(404).json(error);
    });
});

// @route   GET api/v1/posts/tag/:tag
// @desc    Get posts by tag
// @access  Public
router.get("/tag/:tag", getPageData(POSTS_BY_TAG), (req, res) => {
  console.log(req.params.tag);
  let error = { success: false };

  const {
    currentPage,
    paginateCount,
    count,
    skipAmt,
    totalPages
  } = req.pageData;

  Post.find({
    tags: {
      $all: req.params.tag
    }
  })
    .limit(paginateCount)
    .sort({ date: -1 })
    .skip(skipAmt)
    .populate("user", ["displayName", "avatar"])
    .then(posts => {
      res.json({ count, totalPages, currentPage, paginateCount, items: posts });
    })
    .catch(err => {
      error.message = "Error Retrieving Posts";
      res.status(404).json(error);
    });
});

// @route   GET api/v1/posts/:id
// @desc    Get post by dates and tags
// @access  Public
//alt ?
// router.get("/details/query/:start/:end/:tags", (req, res) => {
router.get("/details/query", getPageData(POSTS_BY_DETAILS), (req, res) => {
  const { start, end, tags } = req.query;
  let error = { success: false };

  const {
    currentPage,
    paginateCount,
    count,
    skipAmt,
    totalPages
  } = req.pageData;

  console.log(start, end, tags);
  Post.find(queryBuilder(start, end, tags))
    .limit(paginateCount)
    .sort({ date: -1 })
    .skip(skipAmt)
    .populate("user", ["displayName", "avatar"])
    .then(posts => {
      res.json({ count, totalPages, currentPage, paginateCount, items: posts });
    })
    .catch(err => {
      error.message = "Error Retrieving Posts";
      res.status(404).json(error);
    });
});

// @route   POST api/v1/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let error = { success: false };
    // console.log(req);
    if (!req.files) {
      return res
        .status(400)
        .json({ success: false, message: "No files were uploaded." });
    } else {
      const file = req.files.file;

      jimp
        .read(file.data) //read buffer
        .then(image => {
          const newName = uuidv4();
          const newFileName = `${newName}.${image.getExtension()}`;
          const w = image.getWidth();
          const h = image.getHeight();
          let orientation = "landscape";
          //landscape
          let newWidth = keys.imgWidthLandscape;

          //portrait
          if (w < h) {
            newWidth = keys.imageWidthPortrait;
            orientation = "portrait";
          }

          image
            .quality(keys.imgQuality)
            .resize(newWidth, jimp.AUTO, jimp.RESIZE_BEZIER)
            .writeAsync(`${imagePath}/${newFileName}`)
            .then(image => {
              const newPost = new Post({
                caption: req.body.caption,
                image_id: newFileName,
                user: req.user.id,
                tags: req.body.tags.split(","),
                orientation: orientation
              });

              newPost

                .save()
                .then(post => {
                  writeImage(image, thumbPath, keys.thumbWidth, newFileName);

                  return res.json(post);
                })
                .catch(err => {
                  error.message = "Error Saving post";
                  console.log(error);
                  return res.status(404).json(error);
                });
            })
            .catch(err => {
              error.message = "Error saving image";
              console.log(err);
              return res.status(404).json(error);
            });
        })
        .catch(err => {
          error.message = "Error reading image, please try again";
          console.log(err);
          return res.status(404).json(error);
        });
    }
  }
);

//delete post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let error = { success: false };

    Post.findById(req.params.id)
      .then(post => {
        //remove thumbnail
        post
          .remove()
          .then(() =>
            res.json({ success: true, message: "post has been removed" })
          )
          .catch(err => {
            error.message = "error deleting post";
            res.status(404).json(error);
          });

        fs.unlink(`${thumbPath}/${post.image_id}`, function(err) {
          console.log(err);
          if (err) throw err;

          console.log("thumb deleted");
        });

        //remove big image
        fs.unlink(`${imagePath}/${post.image_id}`, function(err) {
          if (err) throw err;

          console.log("image deleted");
        });
      })
      .catch(err => {
        error.message = "No post found with that ID";
        res.status(404).json(error);
      });
  }
);

module.exports = router;
