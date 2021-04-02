const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { userCheck } = require("../util/authorize");

const router = express.Router();

// POST register user
router.get("/", (req, res) => {
  res.send("USER ROUTES");
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  let user;
  try {
    // Check if user exists
    user = await User.findOne({ email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user." });
  }
  if (user) return res.status(403).json({ message: "User already exits." });

  user = new User({
    email,
    password,
    firstName,
    lastName,
  });

  try {
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error saving user." });
  }

  // JWT
  let token = user.generateToken();
  res.header("x-auth-token", token).json({ id: user._id, email: user.email });
});

// POST user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user;
  try {
    // Check if user exists
    user = await User.findOne({ email });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user." });
  }
  if (!user) return res.status(403).json({ message: "User does NOT exist." });

  // Password comparison
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(403).json({ message: "Invalid password. Try again?" });

  // JWT
  let token = user.generateToken();
  res.header("x-auth-token", token).json({ id: user._id, email: user.email });
});

// User check middleware
router.use(userCheck);

// POST add favorite recipe
router.post("/:recipeId", async (req, res) => {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.recipeId);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Error fetching recipe. Invalid id provided." });
  }

  let user;
  try {
    user = await User.findOne({ recipes: { $eq: req.params.recipeId } });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching user" });
  }

  if (user)
    return res.status(403).send("Recipe is already added to favorites.");

  let correctUser;
  try {
    correctUser = await User.findById(req.user.userId);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching user" });
  }

  try {
    correctUser.recipes.push(req.params.recipeId);
    await correctUser.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error saving favorite recipe." });
  }

  res.send("Recipe added to favorites.");
});

module.exports = router;
