const { Op } = require("sequelize");
const Film = require(`${__dirname}/../models/filmModel`);
const Character = require(`${__dirname}/../models/characterModel`);
//const CharacterFilm = require(`${__dirname}/../models/CharacterFilmModel`);

class QueryFeatures {
  constructor(Model, queryObj) {
    this.queryObj = queryObj;
    this.Model = Model;
  }

  filter() {
    let filter = {};
    let filterObj = this.queryObj;
    //Here is defined the number operation filters based on the query passed
    for (let key in filterObj) {
      for (let i in filterObj[key]) {
        switch (i) {
          case "gt":
            filter[key] = { [Op.gt]: filterObj[key][i] };
            break;
          case "lt":
            filter[key] = { [Op.lt]: filterObj[key][i] };
            break;
          case "gte":
            filter[key] = { [Op.gte]: filterObj[key][i] };
            break;
          case "lte":
            filter[key] = { [Op.lte]: filterObj[key][i] };
            break;
          case "bt":
            filter[key] = {
              [Op.between]: filterObj[key][i].split(","),
            };
            break;
          case "nbt":
            filter[key] = {
              [Op.notBetween]: filterObj[key][i],
            };
            break;
          case "eq":
            filter[key] = {
              [Op.eq]: filterObj[key][i],
            };
            break;
          case "ne":
            filter[key] = {
              [Op.ne]: filterObj[key][i],
            };
            break;

          default:
            break;
        }
        if (i == "gt") {
          filter[key] = { [Op.gt]: filterObj[key][i] };
        }
        if (i == "lt") {
          filter[key] = { [Op.lt]: filterObj[key][i] };
        }
      }
    }
    //
    this.query = this.Model.findAll({
      where: filter,
    });
    //
    return this;
  }
  filmFilter() {
    //Checks to use filters only when we are getting characters AND there is a query for the film
    if (
      this.Model.name == Character.name &&
      this.queryObj.films
    ) {
      this.query = this.Model.findAll({
        include: {
          model: Film,
          attributes: ["title"],
          where: {
            title: this.queryObj.films
              .replace("%", " ")
              .split(","),
          },
          through: {
            attributes: [], //This is to hide attributes from CharacterFilm table
          },
        },
      });
    }
    return this;
  }
  order() {
    //This feature will order by the requested filed on the query string
    if (this.queryObj.orderBy) {
      const orderBy = this.queryObj.orderBy.split(",");
      this.query = this.Model.findAll({
        order: [[orderBy[0], orderBy[1].toUpperCase()]],
      });
    }
    return this;
  }
}

module.exports = QueryFeatures;
