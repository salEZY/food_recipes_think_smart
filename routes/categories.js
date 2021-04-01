const express = require("express");

const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
const auth = require("../util/token");

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

// POST create category
router.post("/", auth, async (req, res) => {
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
    image: req.body.image,
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
router.put("/:categoryId", auth, async (req, res) => {
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
  if (req.body.image) category.image = req.body.image;

  try {
    await category.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving category.");
  }
  res.send(category);
});

// DELETE delete a category
router.delete("/:categoryId", auth, async (req, res) => {
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
