const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    requried: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
