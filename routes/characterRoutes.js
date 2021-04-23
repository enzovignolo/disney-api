const { Router } = require("express");
const charcaterController = require(`${__dirname}/../controllers/characterController`);

const router = Router();

// To Get all characters and create a new one, use this route
router.route("/").get(charcaterController.getAllCharacters).post(charcaterController.addCharacter);
// To get on character, update or delete a character, use this route

router
  .route("/:id")
  .get(charcaterController.getCharacter)
  .put(charcaterController.updateCharacter)
  .delete(charcaterController.deleteCharacter);

module.exports = router;
