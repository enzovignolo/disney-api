const { Router } = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = Router();

router.route("/login").post(authController.login);

router.route("/signUp").post(authController.signUp);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(userController.addUser);

router
  .route("/:id")
  .get(authController.protect, userController.getUser)
  .put(authController.protect, userController.updateUser)
  .delete(
    authController.protect,
    userController.deleteUser
  );

module.exports = router;
