const mongoose = require("mongoose");

const IngridientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  measure: {
    type: Number,
    required: true,
  },
});

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    ingridients: [IngridientSchema],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "categories",
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
