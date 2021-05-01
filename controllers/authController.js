const User = require(`${__dirname}/../models/userModel`);
const ErrorCreator = require(`${__dirname}/../utils/ErrorCreator`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.checkRole = async(req,res,next) =>{
  try {
    if(!req.user) throw new ErrorCreator(401,"Please log in!")
    const user = await User.findOne({where:{email:req.user}});
    console.log(user.role);
    if(user.role != "admin") throw new ErrorCreator(403,"You have not  privilegies to access this resource")
    next()
  } catch (err) {
    next(err);
    
  }
};


exports.signUp = async (req, res, next) => {
  try {
    const {
      email,
      password,
      passwordConfirmation,
    } = req.body;
    const user = await User.create({
      email,
      password,
      passwordConfirmation,
      role: "user", //All users when sign up will have a default role
    });
    req.user = user.email;
    const token = await jwt.sign(
      { email },
      process.env.jwtSecret,
      { expiresIn: 60 * 60 }
    );
    res.status(201).json({
      status:
        "User sucessfuly created and automatically logged in",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user)
      throw new ErrorCreator(
        400,
        `There's no user with email ${req.body.emaill}`
      );
    if (
      req.body.password &&
      (await bcrypt.compare(
        req.body.password,
        user.password
      ))
    ) {
      const token = await jwt.sign(
        { user: user.email },
        process.env.jwtSecret,
        {
          expiresIn: 60 * 60,
        }
      );
      req.user = user.email;
      res.cookie("token", token);
      res.status(200).json({
        status: "success logged in!",
        token: token,
      });
    } else {
      next(new ErrorCreator(401, "Wrong password"));
    }
  } catch (err) {
    next(err);
  }
};
exports.protect = async (req, res, next) => {
  //This intended as a middleware function in order to verify the token
  try {
    //Form token from headers . Token should be given as Bearer <token>

    if (!req.headers.authorization)
      throw new ErrorCreator(
        401,
        "You need to be logged in to access this resource"
      );
    const token = req.headers.authorization.split(" ")[1];
    //Check if token is good
    const decodeToken = await jwt.verify(token, process.env.jwtSecret);
    console.log(decodeToken);
    if (!decodeToken) {
      //If it does not exist,means it is not good, create an error
      throw new ErrorCreator(
        401,
        "Wrong token, please log in again."
      );
    }
    //If token is good, you can access next route
    req.user = decodeToken.user;
    next();
  } catch (err) {
    next(err);
  }
};
