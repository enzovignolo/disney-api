const Film = require(`${__dirname}/../models/filmModel.js`);
const controllerFactory = require(`${__dirname}/controllerFactory.js`);
exports.getAllFilms = (req, res, next) => {
  controllerFactory.getAll(req, res, Film,["filmId","title","picture","releaseDate"]);
};
exports.addFilm = (req, res, next) => {
  controllerFactory.addOne(req, res, next, Film);
};
exports.getFilm = async (req, res, next) => {
  const data = await controllerFactory.getOneAndAssociated(
    req,
    res,
    next,
    Film
  );
  const characters = await data.getCharacters();
  const characterNames = characters.map((character) => {
    return character.fullName;
  });
  data.dataValues.characters = characterNames;
  res.status(200).json({
    status: `Film found`,
    data,
  });
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
