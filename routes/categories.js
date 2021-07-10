const express = require("express");
const Joi = require("joi");

const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const { userCheck, adminCheck } = require("../util/authorize");
const convertImg = require("../util/image");

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  let categories;

  try {
    categories = await Category.find({});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching categories.");
  }
  res.send(categories);
});

// GET recipes of specific category
router.get("/recipes", async (req, res) => {
  let category;
  try {
    category = await Category.findOne({ name: req.body.category });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching category.");
  }
  let recipesByCategory;
  try {
    recipesByCategory = await Recipe.find({ category: category._id });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching recipes.");
  }
  res.send(recipesByCategory);
});

// GET image of recipe
router.get("/img/:categoryId", async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.categoryId);
  } catch (error) {
    return res.status(404).send("Error fetching category.");
  }

  const { image } = category;
  if (!image) return res.status(403).send("No image found");

  const img = Buffer.from(image, "base64");
  res.contentType("image/png").send(img);
});

// User check middleware
router.use(userCheck);

// POST create category
router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let img;
  if (req.files) img = await convertImg(req.files);

  let category;
  try {
    category = await Category.findOne({ name: req.body.name });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching category.");
  }
  if (category) return res.status(403).send("Category already exists");

  category = new Category({
    name: req.body.name,
    image: img,
  });

  try {
    await category.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving category.");
  }
  res.send(category);
});

// PUT edit category
router.put("/:categoryId", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let img;
  if (req.files) img = await convertImg(req.files);

  let category;
  try {
    category = await Category.findById(req.params.categoryId);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send("Error fetching category. Invalid id provided.");
  }

  if (req.body.name) category.name = req.body.name;
  if (req.body.image) category.image = img;

  try {
    await category.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving category.");
  }
  res.send(category);
});

// Admin check middleware
router.use(adminCheck);

// DELETE delete a category
router.delete("/:categoryId", async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.categoryId);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send("Error fetching category. Invalid id provided.");
  }

  let recipesByCategory;
  try {
    recipesByCategory = await Recipe.find({ category: category._id });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching recipes.");
  }

  // Setting category to 'Uncategorized', i hardcoded the id of uncategorized, because i did not want another call to the database to fetch the id.
  recipesByCategory.forEach(async (recipe) => {
    recipe.category = "6065e34f46c80c2da4623a0d";
    try {
      await recipe.save();
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Error saving recipes.");
    }
  });

  try {
    await category.remove();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error deleting category.");
  }
  res.send("Category deleted.");
});

module.exports = router;

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
  });

  return schema.validate(category);
};
