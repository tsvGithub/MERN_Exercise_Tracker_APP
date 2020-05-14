const mongoose = require("mongoose");

//get a new Schema
const Schema = mongoose.Schema;

//schema userSchema with single field 'username'
//& some validations to 'username'
//trim - trim whitespace off
//timestamps automatically create filed for
//when user was created & modified
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);
//mongoose.model with name 'User' (just the name we're
//going to use)
const User = mongoose.model("User", userSchema);

module.exports = User;
