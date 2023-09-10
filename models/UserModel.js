const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  image: {
    type: String,
    required: true,
    max: 255,
  },
});

userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);
