const express = require("express");

const Recipe = require("../models/Recipe");

const router = express.Router();

// GET get all recipes
router.get("/", async (req, res) => {
  let recipes;
  try {
    recipes = await Recipe.find({});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error fetching recipes.");
  }
  if (!recipes) return res.status(404).send("No recipes found.");

  res.send(recipes);
});

// GET get single recipe
router.get("/:recipeId", async (req, res) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("Error fetching recipe. Invalid id provided");
  }

  res.send(recipe);
});

// POST create new recipe
router.post("/", async (req, res) => {
  const { name, description, ingridients, category } = req.body;

  let recipe;
  try {
    recipe = await Recipe.findOne({ name });
  } catch (error) {
    return res.status(403).send("Error fetching recipe.");
  }
  if (recipe) return res.status(403).send("Recipe already exists");

  recipe = new Recipe({
    name,
    description,
    ingridients,
    category,
  });
  try {
    await recipe.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving recipe.");
  }
  res.send(recipe);
});

// PUT Edit recipe
router.put("/:recipeId", async (req, res) => {
  const { name, description } = req.body;

  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("Error fetching recipe.");
  }

  if (name) recipe.name = name;
  if (description) recipe.description = description;

  try {
    await recipe.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving recipe.");
  }
  res.send(recipe);
});

// DELETE recipe
router.delete("/:recipeId", async (req, res) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("Error fetching recipe. Invalid id provided.");
  }
  try {
    await recipe.delete();
  } catch (error) {
    return res.status(500).send("Error deleting recipe.");
  }

  res.send("Recipe deleted.");
});

module.exports = router;
