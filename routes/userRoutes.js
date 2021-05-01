const { Router } = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = Router();

router.route("/login").post(authController.login);

router.route("/signUp").post(authController.signUp);

router
  .route("/")
  .get(authController.protect, authController.checkRole, userController.getAllUsers)
  .post(authController.protect, authController.checkRole,userController.addUser);

router
  .route("/:id")
  .get(authController.protect, authController.checkRole, userController.getUser)
  .put(authController.protect, authController.checkRole,userController.updateUser)
  .delete(
    authController.protect, authController.checkRole,
    userController.deleteUser
  );

module.exports = router;
