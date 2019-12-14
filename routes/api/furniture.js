const router = require("express").Router();
const furnitureController = require("../../controllers/furnitureController.js");

router.route("/:category")
  .get(furnitureController.findByCategory);

router.route("/:category/:vendor")
  .get(furnitureController.findByVendor);



module.exports = router;
