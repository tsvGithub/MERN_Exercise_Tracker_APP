const mongoose = require("mongoose");

//get a new Schema
const Schema = mongoose.Schema;

//schema exerciseSchema with 4 fields
//& validations
//trim - trim whitespace off
//timestamps automatically create filed for
//when user was created & modified
const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);
//mongoose.model with name 'Exercise' (just the name we're
//going to use)
const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
