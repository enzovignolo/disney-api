const bcrypt = require("bcrypt");
const db = require(`${__dirname}/db`);
const { DataTypes } = require("sequelize");
const User = db.define("user", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: {
        msg: "Must be a valid email address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
      len: {
        args: [[8, 100]],
        msg:
          "Password needs to be at least 8 characters long",
      },
    },
  },
  passwordConfirmation: {
    type: DataTypes.STRING,
    validate: {
      //Here will validate that password and confirmation are equal
      isSamePassword(passConfirmation) {
        if (passConfirmation != this.password) {
          throw new Error(
            "Password and Password confirmation are not equal"
          );
        }
      },
    },
  },
  role: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: {
        //Only this roles are admited
        args: [["admin", "user"]],
        msg: "Roler can only be 'user' or 'admin'",
      },
    },
  },
});

//This hook deletes the passwordConfirmation field after its validation
User.afterValidate(
  "deletePassConfirmation",
  (user, options) => {
    user.passwordConfirmation = "";
  }
);
//This hook encrypt the password before save it
User.beforeSave(async (user) => {
  const hashedPass = await bcrypt.hash(user.password, 10);

  user.password = hashedPass;
});

module.exports = User;
