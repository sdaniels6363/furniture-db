const router = require("express").Router();
const furnitureController = require("../../controllers/furnitureController.js");

router.route("/furniture/:category")
  .get(furnitureController.findByCategory);

router.route("/furniture/:category/:vendor")
  .get(furnitureController.findByVendor);



module.exports = router;
