//This will contain methods that repeats themselves for different endpoints
// Mostly CRUD operations

const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`);

// This function will get all data from the DB
exports.getAll = async (req, res, Model, attr) => {
  try {
    const data = await Model.findAll({ attributes: attr });
    res.status(200).json({
      status: "succes",
      results: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

// This function will create a new entry on the DB from the req.body
exports.addOne = async (req, res, next, Model) => {
  try {
    const data = await Model.create(req.body);

    res.status(203).json({
      status: "Succesfully added!",
      data,
    });
  } catch (err) {
    next(err);
  }
};

//This function will get one item by its ID passed as a parameter in the route
exports.getOne = async (req, res, next, Model) => {
  console.log(Model.name);
  try {
    const data = await Model.findByPk(req.params.id);
    if (!data) {
      throw new ErrorCreator(
        400,
        `${Model.name} with id ${req.params.id} does not exist`
      );
    }
    res.status(200).json({
      status: `${Model.name} found!`,
      data,
    });
  } catch (err) {
    next(err);
  }
};

//This function will update an items, selected by its id, with the information passed on the body of the request
exports.updateOne = async (req, res, next, Model, id) => {
  try {
    const data = req.body;
    const dataUpdated = await Model.update(req.body, {
      where: id,
    });
    res.status(200).json({
      status: `${Model.name} successfuly updated!`,
    });
  } catch (err) {
    next(err);
  }
};

//This functions delete from the DB the item selected by its id

exports.deleteOne = async (req, res, next, Model, id) => {
  try {
    const dataDeleted = await Model.destroy({ where: id });
    if (dataDeleted == 0) {
      throw new ErrorCreator(
        400,
        `There's no ${Model.name} with that id`
      );
    }
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
