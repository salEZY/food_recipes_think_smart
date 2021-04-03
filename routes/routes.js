module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome to Food Recipes API");
  });
  app.use("/auth", require("./users"));
  app.use("/recipes", require("./recipes"));
  app.use("/categories", require("./categories"));
};
