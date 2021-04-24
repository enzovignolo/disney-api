const { Router } = require("express");
const filmController = require(`${__dirname}/../controllers/filmController.js`);
const router = Router();

router
  .route("/")
  .get(filmController.getAllFilms)
  .post(filmController.addFilm);

router
  .route("/:id")
  .get(filmController.getFilm)
  .put(filmController.updateFilm)
  .delete(filmController.deleteFilm);

module.exports = router;
