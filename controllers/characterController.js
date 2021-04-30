const Character = require(`${__dirname}/../models/characterModel.js`);
const Film = require(`${__dirname}/../models/filmModel`);
const CharacterFilm = require(`${__dirname}/../models/CharacterFilmModel`);
const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`);
const controllerFactory = require(`${__dirname}/controllerFactory`);

//This function will get the instances from the DB
const getInstances = async (stringValues, Model) => {
  const arrayValues = stringValues.split(",");
  //Make array of instances
  const instances = await Promise.all(
    arrayValues.map(async (value) => {
      return await Model.findAll({
        where: { title: value.trim() },
      });
    })
  );
  return instances;
};

exports.getAllCharacters = (req, res, next) => {
  controllerFactory.getAll(req, res, Character, [
    "characterId",
    "fullName",
    "age",
  ]);
};

exports.addCharacter = async (req, res, next) => {
  try {
    const data = await Character.create(req.body);
    //Make array with all film title
    //Check if films where passed
    if (req.body.films) {
      //if so get intstances from the films
      const films = await getInstances(
        req.body.films,
        Film
      );
      // Add relationship with the character for each film
      for (const film of films) {
        await data.addFilms(film);
      }
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
    //Get instance of a character by its id
    const data = await controllerFactory.getOneAndAssociated(
      req,
      res,
      next,
      Character
    );
    // Get films related to the character found
    const films = await data.getFilms();

    const filmTitles = films.map((film) => {
      return film.title;
    });
    // Add films to the final data
    data.dataValues.films = filmTitles;
    // Response
    res.status(200).json({
      status: `Character found!`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCharacter = async (req, res, next) => {
  try {
    if (req.body.films) {
      const data = await Character.findByPk(req.params.id);

      // Get the film instances
      const films = await getInstances(
        req.body.films,
        Film
      );
      //Delete previous relations
      await data.setFilms([]);
      // Add relationship with the character for each film

      for (const film of films) {
        await data.addFilms(film);
      }
    }
    controllerFactory.updateOne(req, res, next, Character, {
      characterId: req.params.id,
    });
  } catch (err) {
    //console.log(err);
    next(err);
  }
};

exports.deleteCharacter = (req, res, next) => {
  controllerFactory.deleteOne(req, res, next, Character, {
    characterId: req.params.id,
  });
};
