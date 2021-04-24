const Film = require(`${__dirname}/../models/filmModel.js`);
const controllerFactory = require(`${__dirname}/controllerFactory.js`);
exports.getAllFilms = (req, res, next) => {
  controllerFactory.getAll(req, res, Film);
};
exports.addFilm = (req, res, next) => {
  controllerFactory.addOne(req, res, next, Film);
};
exports.getFilm = (req, res, next) => {
  controllerFactory.getOne(req, res, next, Film);
};
exports.updateFilm = (req, res, next) => {
  controllerFactory.updateOne(req, res, next, Film, {
    filmId: req.params.id,
  });
};
exports.deleteFilm = (req, res, next) => {
  controllerFactory.deleteOne(req, res, next, Film, {
    filmId: req.params.id,
  });
};
