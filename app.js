const express = require("express");
const errorHandler = require(`${__dirname}/controllers/errorHandler`);
const ErrorCreator = require(`${__dirname}/utils/ErrorCreator`);
const characterRoutes = require(`${__dirname}/routes/characterRoutes.js`);

const app = express();
//BODY PARSER
app.use(express.json());

//CHARACTER ROUTES & HANDLERS
app.use("/api/v1/character", characterRoutes);

//FILMS ROUTES & HANDLERS

//ERRORS
app.use("*", (req, res, next) => {
  next(new ErrorCreator(400, "THIS ROUTE DOES NOT EXIST"));
});
app.use((err, req, res, next) => {
  errorHandler(res, err);
});

module.exports = app;
