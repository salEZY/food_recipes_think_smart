const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
    },
    image: {
      type: String,
    },
    hasImage: {
      type: Boolean,
      default() {
        return Boolean(this.image);
      },
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("categories", CategorySchema);
