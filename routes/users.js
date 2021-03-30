const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

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
    console.log(error);
    return res.status(500).json({ message: "Server error locating user!" });
  }
  if (user) {
    return res.status(422).json({ message: "User already exits" });
  }

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
    console.log(error);
    return res.status(500).json({ message: "Server error saving!" });
  }

  // JWT
  let token = user.generateToken();
  res.header("x-auth-token", token).send(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    // Check if user exists
    user = await User.findOne({ email });
  } catch (error) {
    return res.status(404).json({ message: "Could not find the user!" });
  }

  if (!user) {
    return res.status(422).json({ message: "User does NOT exist!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(422).json({ message: "Invalid password. Try again?" });
  }

  // JWT
  let token = user.generateToken();
  res.header("x-auth-token", token).send(user);
});

module.exports = router;
