require("dotenv").config();
const express = require("express");
const path = require("path");

const port = 5000;

const connectToDb = require("./util/db");

const app = express();

// Connect to Mongo Atlas
connectToDb();

// Set static folder

/* app.use(express.static("client-recipes/build"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client-recipes", "build", "index.html")
  );
}); */

// Middlewares
require("./util/middlewares")(app);

//Routes
require("./routes/routes")(app);

// Server connection
app.listen(port, () => {
  console.log(`Food Recipes server started at port ${port}...`);
});
