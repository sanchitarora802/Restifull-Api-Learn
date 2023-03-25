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
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email");
    },
  },
  phone:{
    type: Number,
    min:10,
  },
  city:{
    type: String,
  }
});

//Creating a New Collection/Table
const Student = new mongoose.model('Student',studentSchema);

//Exporting the model
module.exports = Student