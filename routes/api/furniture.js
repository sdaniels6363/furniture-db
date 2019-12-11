const router = require("express").Router();
const furnitureController = require("../../controllers/furnitureController.js");

router.route("/furniture/category")
  .get(furnitureController.find)

module.exports = router;
