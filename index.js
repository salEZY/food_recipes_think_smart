require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5000;

const connectToDb = require("./util/db");

const app = express();

// Connect to Mongo Atlas
connectToDb();

// Middlewares
require("./util/middlewares")(app);

//Routes
require("./routes/routes")(app);

// Server connection
app.listen(port, () => {
  console.log(`Food Recipes server started at port ${port}...`);
});
