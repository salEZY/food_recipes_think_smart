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
    hasImage: {
      type: Boolean,
      default() {
        return Boolean(this.image);
      },
    },
    video: {
      type: String,
      match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
    },
  },
  { timestamps: true }
);

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
