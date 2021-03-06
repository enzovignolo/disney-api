const { DataTypes } = require("sequelize");
const db = require(`${__dirname}/db.js`);

//Here's defined the characters model
const Character = db.define(
  "character",
  {
    // Defining columns
    characterId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    age: {type:DataTypes.INTEGER, 
      validate :{ 
        isNumeric:{
          msg:"Age must be a number"}
        }
      },
    weight: {type:DataTypes.FLOAT(2),
      validate :{ 
        isNumeric:{
          msg:"Weight must be a number"}
      }
    },
    history: DataTypes.STRING,
    picture: DataTypes.STRING(45),
  },
  //Options for the table
  { timestamps: false }
);

Character.beforeCreate((character, options) => {
  //Hook to add picture name, if no name was passed
  if (!character.picture) {
    character.picture = `${character.fullName.toLowerCase().replace(" ", "-")}.jpg`;
  }
});

module.exports = Character;
