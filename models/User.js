const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

UserSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: "1h" });
};

module.exports = User = mongoose.model("users", UserSchema);
