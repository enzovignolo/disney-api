const { Router } = require("express");
const filmController = require(`${__dirname}/../controllers/filmController.js`);
const authController = require(`${__dirname}/../controllers/authController`);
const router = Router();

router
  .route("/")
  .get(authController.protect, filmController.getAllFilms)
  .post(filmController.addFilm);

router
  .route("/:id")
  .get(authController.protect, filmController.getFilm)
  .put(authController.protect, filmController.updateFilm)
  .delete(
    authController.protect,
    filmController.deleteFilm
  );

module.exports = router;
