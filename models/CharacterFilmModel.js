//Here is defined the relation between character and film

const db = require(`${__dirname}/db`);
const Character = require(`${__dirname}/characterModel`);
const Film = require(`${__dirname}/filmModel`);

//First a table is defined, to hold the foregin keys
const CharacterFilm = db.define(
  "characterFilm",
  {},
  { timestamps: false }
);

// Then stablish the association n:m with sequelize
Character.belongsToMany(Film, { through: CharacterFilm });
Film.belongsToMany(Character, { through: CharacterFilm });

module.exports = CharacterFilm;
