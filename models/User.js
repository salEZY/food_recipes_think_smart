const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 55,
    },
    firstName: {
      type: String,
      minlength: 5,
      maxlength: 55,
    },
    lastName: {
      type: String,
      minlength: 5,
      maxlength: 55,
    },
    recipes: [{ type: mongoose.Types.ObjectId, ref: "recipes" }],
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", UserSchema);
