const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    toLowerCase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    toLowerCase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    toLowerCase: true,
    trim: true,
  },
  purchasedCourses: {
    type: Array(String),
    default: []
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
