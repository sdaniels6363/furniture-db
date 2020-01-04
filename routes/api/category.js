const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

router.route("/")
  .get(categoryController.findCategories);


module.exports = router;
