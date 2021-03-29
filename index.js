const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Food Recipes API");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
