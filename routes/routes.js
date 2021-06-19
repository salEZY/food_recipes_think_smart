module.exports = (app) => {
  app.get("/api/", (req, res) => {
    res.send("Welcome to Food Recipes API");
  });
  app.use("/api/auth", require("./users"));
  app.use("/api/recipes", require("./recipes"));
  app.use("/api/categories", require("./categories"));
};
