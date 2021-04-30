const controllerFactory = require(`${__dirname}/controllerFactory`);
const User = require(`${__dirname}/../models/userModel`);

exports.getAllUsers = (req, res) => {
  controllerFactory.getAll(req, res, User);
};
exports.addUser = (req, res, next) => {
  controllerFactory.addOne(req, res, next, User);
};

exports.getUser = (req, res, next) => {
  console.log("sadsa");
  controllerFactory.getOne(req, res, next, User);
};

exports.updateUser = (req, res, next) => {
  console.log("gasdgas");
  controllerFactory.updateOne(req, res, next, User, {
    userId: req.params.id,
  });
};
exports.deleteUser = (req, res, next) => {
  controllerFactory.deleteOne(req, res, next, User, {
    userId: req.params.id,
  });
};
