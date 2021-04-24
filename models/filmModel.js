const { DataTypes } = require("sequelize");
const db = require(`${__dirname}/db.js`);

const Film = db.define(
  "film",
  {
    //Here are defined the columns from film table
    filmId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    picture: DataTypes.STRING(60),
    score: {
      type: DataTypes.FLOAT(1, 2),
      validate: {
        min: 1,
        max: 5,
      },
    },
    genre: {
      type: DataTypes.STRING(45),
      validate: { isAlpha: true },
    },
  },
  //Table options
  {
    timestamps: false,
  }
);

//This hook will generate the name of the picture automatically, by
//the movie's title
Film.beforeCreate((film, options) => {
  if (!film.picture) {
    film.picture = `${film.title
      .toLowerCase()
      .replace(" ", "-")}.jpg`;
  }
});

module.exports = Film;
