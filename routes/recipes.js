const express = require("express");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Recipe = require("../models/Recipe");
const { userCheck, adminCheck } = require("../util/authorize");
const convertImg = require("../util/image");

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
    recipe = await Recipe.findById(req.params.recipeId).select(
      "name description ingridients"
    );
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("Error fetching recipe.");
  }

  // const img = Buffer.from(recipe.image, "base64");
  // recipe.image = img;
  res.send(recipe);
});

// GET image of recipe
router.get("/img/:recipeId", async (req, res) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    return res.status(404).send("Error fetching recipe.");
  }

  const { image } = recipe;
  if (!image) return res.status(403).send("No image found");

  const img = Buffer.from(image, "base64");
  res.contentType("image/png").send(img);
});

// User check middleware
router.use(userCheck);

// POST create new recipe
router.post("/", async (req, res) => {
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, ingridients, category } = req.body;
  let img;
  if (req.files) img = await convertImg(req.files);

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
    image: img,
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
  const { name, description, ingridients } = req.body;

  let img;
  if (req.files) img = await convertImg(req.files);

  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    console.error(error.message);
    return res.status(404).send("Error fetching recipe.");
  }

  if (name) recipe.name = name;
  if (description) recipe.description = description;
  if (ingridients) recipe.ingridients = ingridients;
  recipe.img = img;

  try {
    await recipe.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Error saving recipe.");
  }
  res.send(recipe);
});

// Admin check middleware
router.use(adminCheck);

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

const validateRecipe = (recipe) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    ingridients: Joi.array(),
    category: Joi.objectId(),
  });

  return schema.validate(recipe);
};
