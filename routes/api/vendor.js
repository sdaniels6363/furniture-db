const router = require("express").Router();
const vendorController = require("../../controllers/vendorController.js");

router.route("/")
    .get(vendorController.findAll);


module.exports = router;