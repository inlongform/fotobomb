const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlagSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  reason: {
    type: String,
    require: true,
    max: 280
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("flag", FlagSchema);
