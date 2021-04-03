const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const compression = require("compression");

module.exports = (app) => {
  app.use(express.json({ extended: false }));
  app.use(cors());
  app.use(fileUpload());
  app.use(helmet());
  app.use(compression());
};
