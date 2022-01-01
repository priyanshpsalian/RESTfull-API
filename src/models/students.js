const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present"],
    validator(value) {
      if (validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    min: 10,
    // max: 10,
    required: true,
    unique: [true, "Phone no already in use"],
  },
  address: {
    type: String,
    required: true,
  },
});

const students = new mongoose.model("Student", studentSchema);

module.exports = students;
