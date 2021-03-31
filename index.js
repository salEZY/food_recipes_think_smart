require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 5000;

const connectToDb = require("./util/db");

const app = express();

// Connect to Mongo Atlas
connectToDb();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Food Recipes API");
});
app.use("/auth", require("./routes/users"));
app.use("/recipes", require("./routes/recipes"));

// Server connection
app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
