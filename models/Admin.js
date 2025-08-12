const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
