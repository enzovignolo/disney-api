const { Router } = require("express");
const charcaterController = require(`${__dirname}/../controllers/characterController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = Router();

// To Get all characters and create a new one, use this route
router
  .route("/")
  .get(
    authController.protect,
    charcaterController.getAllCharacters
  )
  .post(
    authController.protect,
    charcaterController.addCharacter
  );
// To get on character, update or delete a character, use this route

router
  .route("/:id")
  .get(
    authController.protect,
    charcaterController.getCharacter
  )
  .put(
    authController.protect,
    charcaterController.updateCharacter
  )
  .delete(
    authController.protect,
    charcaterController.deleteCharacter
  );

module.exports = router;
