const Character = require(`${__dirname}/../models/characterModel.js`);
const Film = require(`${__dirname}/../models/filmModel`);
const CharacterFilm = require(`${__dirname}/../models/CharacterFilmModel`);
const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`);
const controllerFactory = require(`${__dirname}/controllerFactory`);

exports.getAllCharacters = (req, res, next) => {
  controllerFactory.getAll(req, res, Character, [
    "characterId",
    "fullName",
    "age",
  ]);
};

const getInstance = async (filmTitle) => {
  const film = await Film.findAll({
    where: { title: filmTitle },
  });
};

exports.addCharacter = async (req, res, next) => {
  try {
    const data = await Character.create(req.body);
    //Make array with all film titles
    const filmTitles = req.body.film.split(",");
    //Make array of films instances
    const films = await Promise.all(
      filmTitles.map(async (title) => {
        return await Film.findAll({
          where: { title: title },
        });
      })
    );
    // Add relationship with the character for each film
    for (const film of films) {
      await data.addFilms(film);
    }

    res.status(203).json({
      status: "Succesfully added!",
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getCharacter = async (req, res, next) => {
  try {
    const data = await Character.findByPk(req.params.id);
    if (!data) {
      throw new ErrorCreator(
        400,
        `${Character.name} with id ${req.params.id} does not exist`
      );
    }
    const films = await data.getFilms();
    var associatedTitles = [];
    films.forEach((film) => {
      associatedTitles.push(film.title);
    });
    data.dataValues.films = associatedTitles;
    res.status(200).json({
      status: `${Character.name} found!`,
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.updateCharacter = (req, res, next) => {
  controllerFactory.updateOne(req, res, next, Character, {
    characterId: req.params.id,
  });
};

exports.deleteCharacter = (req, res, next) => {
  controllerFactory.deleteOne(req, res, next, Character, {
    characterId: req.params.id,
  });
};
