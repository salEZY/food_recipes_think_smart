const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("categories", CategorySchema);
