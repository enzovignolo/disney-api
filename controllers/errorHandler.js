//Error for unique validator violation
const validationError = (res, err) => {
  res.status(400).json({
    status: "Error",
    message: err.errors[0].message,
  });
};

const errorHandler = (res, err) => {
  if (err.name == "SequelizeValidationError") {
    validationError(res, err);
  } else {
    res
      .status(err.statusCode || 500)
      .json({ status: "Error", message: err.message });
  }
};

module.exports = errorHandler;
