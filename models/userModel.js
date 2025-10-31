const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
