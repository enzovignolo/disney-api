const Character = require(`${__dirname}/../models/characterModel.js`);
const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`);
const controllerFactory = require(`${__dirname}/controllerFactory`);

exports.getAllCharacters = (req, res, next) => {
  controllerFactory.getAll(req, res, Character, [
    "characterId",
    "fullName",
    "age",
  ]);
};

exports.addCharacter = (req, res, next) => {
  controllerFactory.addOne(req, res, next, Character);
};

exports.getCharacter = (req, res, next) => {
  controllerFactory.getOne(req, res, next, Character);
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
