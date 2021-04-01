const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

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
    console.log(error);
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
    console.log(error);
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

module.exports = router;
