const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require(`${__dirname}/controllers/errorHandler`);
const ErrorCreator = require(`${__dirname}/utils/ErrorCreator`);
const characterRoutes = require(`${__dirname}/routes/characterRoutes.js`);
const filmRoutes = require(`${__dirname}/routes/filmRoutes.js`);
const userRoutes = require(`${__dirname}/routes/userRoutes`);

const app = express();
//BODY & COOKIE PARSER
app.use(express.json());
app.use(cookieParser());
//CHARACTER ROUTES & HANDLERS
app.use("/api/v1/character", characterRoutes);

//FILMS ROUTES & HANDLERS
app.use("/api/v1/film", filmRoutes);

//USERS ROUTES & HANDLERS
app.use("/api/v1/user", userRoutes);
//ERRORS
app.use("*", (req, res, next) => {
  console.log(req.originalUrl);
  next(new ErrorCreator(400, "THIS ROUTE DOES NOT EXIST"));
});
app.use((err, req, res, next) => {
  errorHandler(res, err);
});

module.exports = app;
