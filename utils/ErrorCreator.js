class ErrorCreator extends Error {
  //This class is used to create errors and inherites from Error express class.
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode || 500; // HTML ERROR CODE, IF NO ONE GIVEN, DEFAULT IS 500
    this.message =
      message || "Ooops something went wrong! ⚠"; // MESSAGE, IF NO ONE GIVE, USE DEFAULT ONE.
  }
}

module.exports = ErrorCreator;
