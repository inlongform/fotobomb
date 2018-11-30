const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  location: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  // avatar: {
  //   type: String
  // },
  date: {
    type: Date,
    default: Date.now
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String
    }
  }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
