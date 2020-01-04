const router = require("express").Router();
const furnitureController = require("../../controllers/furnitureController.js");

router.route("/:room/:category")
  .get(furnitureController.findByCategory);


module.exports = router;
