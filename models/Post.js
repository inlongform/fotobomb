const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  caption: {
    type: String,
    require: false,
    max: 280
  },
  image_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  orientation: {
    type: String,
    required: true
  },
  shortId: {
    type: String,
    default: shortid.generate
  },
  tags: {
    type: [String]
  },
  location: {
    type: String
  }
});

PostSchema.post("save", (doc, next) => {
  doc
    .populate("user", ["displayName", "avatar"])
    .execPopulate()
    .then(() => {
      next();
    });
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
