const router = require("express").Router();
const clientController = require("../../controllers/clientController");

router.route("/create")
  .post(clientController.create);

router.route("/list")
  .get(clientController.list);

router.route("/delete")
  .post(clientController.delete)

module.exports = router;